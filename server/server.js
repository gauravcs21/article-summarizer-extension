const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = "AIzaSyD5NLa1qmqZBXWKxhmwzNPOUqtyfGsu4qY"; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Endpoint to summarize a webpage URL
app.post("/summarize-url", async (req, res) => {
  const { url } = req.body;

  try {
    // Fetch webpage content
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const articleContent = $("p").text(); 

    // Summarize using Google Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Summarize the following article:\n\n${articleContent}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error("Error fetching/summarizing article:", error);
    res.status(500).json({ error: "Failed to summarize the article." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
