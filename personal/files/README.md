# Guitar Music Writer - Setup Guide

## What Was Fixed

1. **Broken JavaScript** - Removed random JSON-LD fragments (lines 83-125) that broke the code
2. **Embedded JSON-LD** - Added the complete tool specification inside the HTML `<script>` tag
3. **Claude API Integration** - Implemented real API calls to generate music (no more placeholders)

## How the JSON-LD Embedding Works

The JSON-LD tool specification is now embedded directly in the HTML:

```html
<script type="application/ld+json" id="tool-spec">
{
  "@context": { ... },
  "@graph": [ ... ]
}
</script>
```

The JavaScript reads it like this:
```javascript
const scriptTag = document.getElementById('tool-spec');
this.toolSpec = JSON.parse(scriptTag.textContent);
```

## Claude API Integration

The app now calls the Claude API to generate music. Here's how it works:

### 1. API Call Structure
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
            { role: "user", content: prompt }
        ]
    })
});
```

### 2. Why No API Key?

The code doesn't include an API key because it's designed to run **inside an artifact in Claude.ai**. When you create an artifact with this code in Claude.ai:

- Claude automatically handles authentication
- No API key needed in the code
- The API calls "just work" from within the artifact

### 3. If Using Outside Claude.ai

If you want to use this as a standalone webpage, you'll need to:

**Option A: Add API Key (Not Recommended - Security Risk)**
```javascript
headers: {
    "Content-Type": "application/json",
    "x-api-key": "your-api-key-here", // DON'T do this in production!
}
```

**Option B: Use a Backend Proxy (Recommended)**
```javascript
// Instead of calling Anthropic directly, call your own server
const response = await fetch("https://your-backend.com/api/generate-music", {
    method: "POST",
    body: JSON.stringify(inputs)
});
```

Your backend would then:
- Store the API key securely
- Make the Anthropic API call
- Return results to the frontend

### 4. Response Handling

The code extracts and parses the JSON response:
```javascript
const data = await response.json();

// Extract text from Claude's response
let textContent = data.content
    .filter(item => item.type === 'text')
    .map(item => item.text)
    .join('\n');

// Strip markdown formatting and parse JSON
let jsonStr = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
const result = JSON.parse(jsonStr);
```

## Usage Instructions

### For Claude.ai (Easiest):
1. Upload all three files to Claude
2. Ask Claude to create an artifact with the fixed code
3. Use the app directly in the artifact - API calls work automatically

### For Local Testing (Without API):
1. Modify `executeTool()` to return mock data
2. Open `guitar-music-writer-fixed.html` in a browser

### For Production Deployment:
1. Create a backend API that calls Anthropic
2. Update the fetch URL in `executeTool()` to point to your backend
3. Deploy normally

## File Structure

- `guitar-music-writer-fixed.html` - Main HTML with embedded JSON-LD
- `guitar-music-writer-fixed.js` - Fixed JavaScript with Claude API integration
- `guitar-music-writer.css` - Styles (unchanged)

## Key Changes in JavaScript

1. **Removed broken code** (lines 83-125)
2. **Added proper API integration** in `executeTool()`
3. **Added error handling** for API failures
4. **Added JSON parsing** with markdown stripping
5. **Added validation** for API responses

## Testing

1. Fill in: Tone, Theme, Story, Complexity
2. Click "Generate Music"
3. App calls Claude API to generate:
   - Verse with lyrics, chords, tabs
   - Chorus with lyrics, chords, tabs
   - Bridge with lyrics, chords, tabs
4. Results display with export to PDF option
5. Songs saved to history (localStorage)
