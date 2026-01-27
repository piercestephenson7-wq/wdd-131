// Guitar Music Writer - Web Application
// This application uses Claude API to generate guitar music

class GuitarMusicWriter {
    constructor() {
        this.toolSpec = null;
        this.currentResult = null;
        this.history = this.loadHistory();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateComplexityDisplay();
        this.renderHistory();
        this.loadToolSpec();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('music-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateMusic();
        });

        // Complexity slider
        document.getElementById('complexity').addEventListener('input', (e) => {
            document.getElementById('complexity-value').textContent = e.target.value;
        });

        // Export PDF button
        document.getElementById('export-pdf-btn').addEventListener('click', () => {
            this.exportToPDF();
        });

        // New song button
        document.getElementById('new-song-btn').addEventListener('click', () => {
            this.resetForm();
        });

        // Clear history button
        document.getElementById('clear-history-btn').addEventListener('click', () => {
            this.clearHistory();
        });
    }

    updateComplexityDisplay() {
        const slider = document.getElementById('complexity');
        const display = document.getElementById('complexity-value');
        display.textContent = slider.value;
    }

    loadToolSpec() {
        // Load from embedded script tag
        const scriptTag = document.getElementById('tool-spec');
        if (scriptTag && scriptTag.textContent.trim()) {
            try {
                this.toolSpec = JSON.parse(scriptTag.textContent);
                console.log('Tool specification loaded successfully');
            } catch (error) {
                console.error('Error parsing tool specification:', error);
                this.showError('Failed to load music generation tool specification.');
            }
        } else {
            console.error('Tool specification not found in HTML');
            this.showError('Tool specification not embedded in HTML.');
        }
    }

    async generateMusic() {
        // Get form inputs
        const tone = document.getElementById('tone').value;
        const toneCustom = document.getElementById('tone-custom').value;
        const theme = document.getElementById('theme').value;
        const story = document.getElementById('story').value;
        const complexity = parseInt(document.getElementById('complexity').value);

        // Validate inputs
        if (!tone || !theme || !story) {
            this.showError('Please fill in all required fields.');
            return;
        }

        // Use custom tone if provided, otherwise use selected tone
        const finalTone = toneCustom.trim() || tone;

        // Show loading state
        document.getElementById('input-section').classList.add('hidden');
        document.getElementById('loading-section').classList.remove('hidden');
        document.getElementById('results-section').classList.add('hidden');
        document.getElementById('generate-btn').disabled = true;

        try {
            // Execute tool via Claude API
            const result = await this.executeTool({
                tone: finalTone,
                theme: theme,
                story: story,
                complexity: complexity
            });

            this.currentResult = result;
            this.displayResults(result);
            this.saveToHistory(result, finalTone, theme, complexity);
            this.renderHistory();
        } catch (error) {
            console.error('Error generating music:', error);
            this.showError('Generation failed: ' + (error.message || 'Unknown error. Please try again.'));
            document.getElementById('input-section').classList.remove('hidden');
        } finally {
            document.getElementById('loading-section').classList.add('hidden');
            document.getElementById('generate-btn').disabled = false;
        }
    }

    async executeTool(inputs) {
        // Build the prompt that includes the tool spec and user inputs
        const prompt = `You are executing the AALang Music Generation Tool. Generate guitar music based on these inputs:

Tone: ${inputs.tone}
Theme: ${inputs.theme}
Story: ${inputs.story}
Complexity: ${inputs.complexity}/10

Generate a complete song with verse, chorus, and bridge sections. Each section must include:
- Lyrics that match the tone, theme, and story
- A chord progression appropriate for the complexity level
- Guitar tabs in ASCII format

Return ONLY valid JSON in this exact format:
{
  "sections": [
    {
      "type": "verse",
      "lyrics": "...",
      "chords": ["Am", "F", "C", "G"],
      "tabs": "e|---0---1---0---3---\\nB|---1---1---1---0---\\nG|---2---2---0---0---\\nD|---2---3---2---0---\\nA|---0---3---3---2---\\nE|-------1-------3---"
    },
    {
      "type": "chorus",
      "lyrics": "...",
      "chords": ["C", "G", "Am", "F"],
      "tabs": "..."
    },
    {
      "type": "bridge",
      "lyrics": "...",
      "chords": ["Dm", "G", "C"],
      "tabs": "..."
    }
  ],
  "metadata": {
    "complexity": ${inputs.complexity},
    "tone": "${inputs.tone}",
    "theme": "${inputs.theme}"
  }
}

Remember: Use LLM reasoning for all generation. The complexity level affects chord sophistication and tab difficulty. Make the lyrics meaningful and connected to the story.`;

        try {
            // Call Claude API
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 4000,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // Extract text content from response
            let textContent = '';
            if (data.content && Array.isArray(data.content)) {
                textContent = data.content
                    .filter(item => item.type === 'text')
                    .map(item => item.text)
                    .join('\n');
            }

            if (!textContent) {
                throw new Error('No text content in API response');
            }

            // Parse JSON from response (strip markdown if present)
            let jsonStr = textContent.trim();
            jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
            const result = JSON.parse(jsonStr);
            
            // Validate result structure
            if (!result.sections || !Array.isArray(result.sections) || !result.metadata) {
                throw new Error('Invalid response structure from API');
            }

            return result;

        } catch (error) {
            console.error('Tool execution error:', error);
            throw error;
        }
    }

    displayResults(result) {
        const resultsContent = document.getElementById('results-content');
        resultsContent.innerHTML = '';

        // Display each section
        result.sections.forEach(section => {
            const sectionBlock = document.createElement('div');
            sectionBlock.className = 'section-block';

            const title = document.createElement('h3');
            title.className = 'section-title';
            title.textContent = section.type.charAt(0).toUpperCase() + section.type.slice(1);

            const lyrics = document.createElement('div');
            lyrics.className = 'lyrics';
            lyrics.textContent = section.lyrics;

            const chordsDiv = document.createElement('div');
            chordsDiv.className = 'chords';
            section.chords.forEach(chord => {
                const chordSpan = document.createElement('span');
                chordSpan.className = 'chord';
                chordSpan.textContent = chord;
                chordsDiv.appendChild(chordSpan);
            });

            const tabs = document.createElement('pre');
            tabs.className = 'tabs';
            tabs.textContent = section.tabs;

            sectionBlock.appendChild(title);
            sectionBlock.appendChild(lyrics);
            sectionBlock.appendChild(chordsDiv);
            sectionBlock.appendChild(tabs);
            resultsContent.appendChild(sectionBlock);
        });

        // Display metadata
        const metadata = document.createElement('div');
        metadata.className = 'metadata';
        metadata.innerHTML = `
            <div class="metadata-item"><strong>Complexity:</strong> ${result.metadata.complexity}/10</div>
            <div class="metadata-item"><strong>Tone:</strong> ${result.metadata.tone}</div>
            <div class="metadata-item"><strong>Theme:</strong> ${result.metadata.theme}</div>
            <div class="metadata-item" style="margin-top: 10px; font-style: italic;">Created using AALang and Gab</div>
        `;
        resultsContent.appendChild(metadata);

        // Show results section
        document.getElementById('results-section').classList.remove('hidden');
    }

    exportToPDF() {
        if (!this.currentResult) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let yPos = 20;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;
        const maxWidth = pageWidth - 2 * margin;

        // Title
        doc.setFontSize(18);
        doc.text('Generated Guitar Music', margin, yPos);
        yPos += 15;

        // Metadata
        doc.setFontSize(12);
        doc.text(`Complexity: ${this.currentResult.metadata.complexity}/10`, margin, yPos);
        yPos += 7;
        doc.text(`Tone: ${this.currentResult.metadata.tone}`, margin, yPos);
        yPos += 7;
        doc.text(`Theme: ${this.currentResult.metadata.theme}`, margin, yPos);
        yPos += 15;

        // Sections
        this.currentResult.sections.forEach(section => {
            // Check if we need a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            // Section title
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(section.type.charAt(0).toUpperCase() + section.type.slice(1), margin, yPos);
            yPos += 10;

            // Lyrics
            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            const lyricsLines = doc.splitTextToSize(section.lyrics, maxWidth);
            doc.text(lyricsLines, margin, yPos);
            yPos += lyricsLines.length * 5 + 5;

            // Chords
            doc.setFontSize(10);
            doc.text(`Chords: ${section.chords.join(' - ')}`, margin, yPos);
            yPos += 8;

            // Tabs
            doc.setFontSize(8);
            doc.setFont('courier');
            const tabLines = section.tabs.split('\n');
            tabLines.forEach(line => {
                if (yPos > 280) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(line, margin, yPos);
                yPos += 4;
            });
            yPos += 10;
        });

        // Attribution
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text('Created using AALang and Gab', margin, doc.internal.pageSize.height - 10);

        // Save PDF
        doc.save(`guitar-music-${Date.now()}.pdf`);
    }

    resetForm() {
        document.getElementById('music-form').reset();
        document.getElementById('complexity-value').textContent = '5';
        document.getElementById('input-section').classList.remove('hidden');
        document.getElementById('results-section').classList.add('hidden');
        this.currentResult = null;
    }

    saveToHistory(result, tone, theme, complexity) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            tone: tone,
            theme: theme,
            complexity: complexity,
            result: result
        };

        this.history.unshift(historyItem);
        
        // Keep only last 20 items
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }

        this.saveHistory();
    }

    loadHistory() {
        try {
            const stored = localStorage.getItem('guitarMusicHistory');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('guitarMusicHistory', JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    renderHistory() {
        const historyList = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No songs generated yet. Generate your first song above!</div>';
            return;
        }

        historyList.innerHTML = '';
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const date = new Date(item.timestamp);
            const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            historyItem.innerHTML = `
                <div class="history-item-title">${item.theme} (${item.tone})</div>
                <div class="history-item-meta">Complexity: ${item.complexity}/10 • ${dateStr}</div>
            `;

            historyItem.addEventListener('click', () => {
                this.currentResult = item.result;
                this.displayResults(item.result);
                document.getElementById('input-section').classList.add('hidden');
                document.getElementById('results-section').classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            historyList.appendChild(historyItem);
        });
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all song history?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const inputSection = document.getElementById('input-section');
        inputSection.insertBefore(errorDiv, inputSection.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GuitarMusicWriter();
});
