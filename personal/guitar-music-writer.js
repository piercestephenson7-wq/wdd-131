// Guitar Music Writer - Web Application
// This application embeds and uses the AALang Music Generation Tool

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
        // Try to load from script tag first (embedded in HTML), then fallback to fetch
        const scriptTag = document.getElementById('tool-spec');
        if (scriptTag && scriptTag.textContent.trim()) {
            // JSON-LD is embedded in HTML script tag
            this.toolSpec = JSON.parse(scriptTag.textContent);
        } else {
            // Fallback: try to fetch from file (requires local server for CORS)
            this.loadToolSpecFromFile();
        }
    }

    async loadToolSpecFromFile() {
        try {
            const response = await fetch('guitar-music-writer.jsonld');
            this.toolSpec = await response.json();
            // Also update the script tag for future use
            const scriptTag = document.getElementById('tool-spec');
            if (scriptTag) {
                scriptTag.textContent = JSON.stringify(this.toolSpec, null, 2);
            }
        } catch (error) {
            console.error('Error loading tool specification:', error);
            console.warn('Note: To avoid CORS issues, either:');
            console.warn('1. Use a local web server (e.g., python -m http.server)');
            console.warn('2. Embed the JSON-LD in the HTML script tag with id="tool-spec"');
            this.showError('Failed to load music generation tool. Please ensure guitar-music-writer.jsonld is accessible or embedded in the HTML.');
        }
    }

                  "severity": "critical",
                  "action": "Execute commands or proceed with actions while waiting for user response",
                  "details": "DO NOT execute commands (date, file operations, etc.) while waiting for user response. DO NOT proceed with actions until you receive explicit user answer to questions.",
                  "appliesTo": ["user question handling", "all actions while waiting"]
                }
              ]
            },
            {
              "@id": "ex:MusicGenerationAgent",
              "@type": "LLMAgent",
              "pattern": "1-mode-7-actor",
              "purpose": "Generate guitar music (lyrics with chords and guitar tabs) based on user inputs: tone, theme, story, and complexity level",
              "modes": ["ex:GenerationMode"],
              "actors": [
                "ex:InputProcessingActor",
                "ex:ChordGenerationActor",
                "ex:ChordSelectionActor",
                "ex:LyricsGenerationActor",
                "ex:TabGenerationActor",
                "ex:OutputFormattingActor",
                "ex:StateActor"
              ],
              "constraints": [
                "All music generation must use LLM reasoning, not system commands or code execution",
                "Complexity meter (1-10) affects chord complexity and tab difficulty, not lyrics complexity",
                "Generate multiple chord progressions and select the best one",
                "Chord progressions generated first, then lyrics matched to chords",
                "Use semantic interpretation for complexity (not explicit rules)",
                "State resets on each tool execution - no persistence across sessions"
              ],
              "requirements": [
                {
                  "severity": "critical",
                  "action": "Ensure variety across sessions",
                  "details": "Use contextual cues (tone, theme, story, complexity) as seeds for variability. Ensure different inputs produce different outputs. Avoid deterministic/repetitive behavior by incorporating input context into generation decisions.",
                  "appliesTo": ["all generation actors"]
                }
              ]
            }
            // Note: Full tool specification is embedded. The complete JSON-LD includes all actors, personas, and specifications.
            // For brevity, showing key parts. The full spec is available in guitar-music-writer.jsonld
          ]
        };
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
            // Execute AALang tool via LLM API
            // Note: This requires an LLM API integration
            // For demonstration, we'll use a placeholder that simulates the tool execution
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
            this.showError('Generation failed. Please reload the page and try again.');
        } finally {
            document.getElementById('loading-section').classList.add('hidden');
            document.getElementById('generate-btn').disabled = false;
        }
    }

    async executeTool(inputs) {
        // This function should integrate with an LLM API to execute the AALang tool
        // For now, we'll provide a placeholder that demonstrates the expected flow
        
        // In a real implementation, you would:
        // 1. Load the AALang tool JSON-LD specification (already loaded in this.toolSpec)
        // 2. Send the tool specification and inputs to an LLM API
        // 3. The LLM interprets the JSON-LD and executes the tool as an AALang agent
        // 4. Return the generated JSON result

        // Placeholder: Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Placeholder: Return example structure
        // In production, this would come from the LLM API executing the AALang tool
        return {
            sections: [
                {
                    type: 'verse',
                    lyrics: `[Verse lyrics based on: ${inputs.story}]`,
                    chords: ['Am', 'F', 'C', 'G'],
                    tabs: 'e|---0---1---0---3---\nB|---1---1---1---0---\nG|---2---2---0---0---\nD|---2---3---2---0---\nA|---0---3---3---2---\nE|-------1---1---3---'
                },
                {
                    type: 'chorus',
                    lyrics: `[Chorus lyrics based on theme: ${inputs.theme}]`,
                    chords: ['C', 'G', 'Am', 'F'],
                    tabs: 'e|---0---3---0---1---\nB|---1---0---1---1---\nG|---0---0---2---2---\nD|---2---0---2---3---\nA|---3---2---0---3---\nE|-------3---0---1---'
                }
            ],
            metadata: {
                complexity: inputs.complexity,
                tone: inputs.tone,
                theme: inputs.theme
            }
        };

        // TODO: Replace with actual LLM API integration
        // Example integration pattern:
        /*
        const response = await fetch('YOUR_LLM_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                tool_spec: this.toolSpec,
                inputs: inputs,
                instruction: "Execute this AALang tool as an agent. Generate music based on the provided inputs."
            })
        });
        return await response.json();
        */
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
            title.textContent = section.type;

            const lyrics = document.createElement('div');
            lyrics.className = 'lyrics';
            lyrics.textContent = section.lyrics;

            const chords = document.createElement('div');
            chords.className = 'chords';
            section.chords.forEach(chord => {
                const chordSpan = document.createElement('span');
                chordSpan.className = 'chord';
                chordSpan.textContent = chord;
                chords.appendChild(chordSpan);
            });

            const tabs = document.createElement('pre');
            tabs.className = 'tabs';
            tabs.textContent = section.tabs;

            sectionBlock.appendChild(title);
            sectionBlock.appendChild(lyrics);
            sectionBlock.appendChild(chords);
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
            doc.setFont(undefined, 'courier');
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
