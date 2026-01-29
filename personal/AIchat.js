const button = document.getElementById("send");
const promptInput = document.getElementById("prompt");
const responseBox = document.getElementById("response");

button.addEventListener("click", async () => {
  const prompt = promptInput.value;
  responseBox.textContent = "Thinking...";

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi3",
      prompt: prompt,
      stream: false
    })
  });

  const data = await res.json();
  responseBox.textContent = data.response;
});