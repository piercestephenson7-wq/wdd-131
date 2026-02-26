// Access the hidden key
const apiKey = import.meta.env.VITE_GEMINI_KEY;

async function callGemini(prompt) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);
}

// Example usage for your Pro-Quest app:
// callGemini("Categorize this task: Buy milk");