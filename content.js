chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarize") {
      const articleContent = document.body.innerText; // Simplified article extraction
      fetch("http://localhost:3000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: articleContent })
      })
        .then((response) => response.json())
        .then((data) => {
          chrome.runtime.sendMessage({
            action: "displaySummary",
            summary: data.summary
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  });
  