const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// Create a new instance of the OpenAI configuration
const configuration = new Configuration({ apiKey: "" });

// Create a new instance of the OpenAI API using the configuration
const openai = new OpenAIApi(configuration);

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set the port number for the server
const port = 3010;

// Define the initial instruction for the chat
const instruction = {
    role: "system",
    content:
        "Make it personal greeting the person, Tuan, and treat every response like a diary entry and you are the person's therapist and friend who is always there to listen.",
};

// Store the chat history
let chatHistory = [instruction];

// Handle POST requests to the root URL
app.post("/", async (req, res) => {
    try {
        let { message, currentModel } = req.body;

        // Set the current model to use
        currentModel = "gpt-3.5-turbo";

        // Add the user's message to the chat history
        chatHistory.push({ role: "user", content: message });

        // Create a chat completion using the OpenAI API
        const response = await openai.createChatCompletion({
            model: currentModel,
            messages: chatHistory,
            max_tokens: 100,
            temperature: 0.5,
        });

        // Add the assistant's response to the chat history
        chatHistory.push(response.data.choices[0].message);

        // Send the assistant's response as the JSON response
        res.json({ message: response.data.choices[0].message });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: `An error occurred ${error}.` });
    }
});

// Handle GET requests to the "/clear" endpoint
app.get("/clear", async (req, res) => {
    try {
        // Clear the chat history
        chatHistory = [instruction];

        // Send a success message along with the cleared chat history
        res.json({ message: "success", chatHistory });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: `An error occurred ${error}.` });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
