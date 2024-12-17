document.getElementById("summarize").addEventListener("click", () => {
    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
  
      // Send URL to backend
      fetch("http://localhost:3000/summarize-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("summary").innerText = data.summary;
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("summary").innerText =
            "Failed to summarize the article.";
        });
    });
  });
  