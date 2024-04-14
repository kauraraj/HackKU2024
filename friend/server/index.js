const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({apiKey: ""
});``

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3010;

const instruction = {
    role: "system",
    content: "Make it personal greeting the person, Tuan, and treat every response like a diary entry and you are the person's therapist and friend who is always there to listen."
};

let chatHistory = [instruction]; // Store the chat history

app.post("/", async (req, res) => {
    try {

        let {message, currentModel} = req.body;

        currentModel = "gpt-3.5-turbo";
        
        // Add the user's message to the chat history
        chatHistory.push({role: "user", content: message});

        const response = await openai.createChatCompletion({
            model: currentModel, 
            messages: chatHistory, 
            max_tokens: 100, 
            temperature: 0.5
        });

        // Add the assistant's response to the chat history
        chatHistory.push(response.data.choices[0].message);

        res.json({message: response.data.choices[0].message});
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({error: `An error occurred ${error}.`});
    }
});

app.get("/clear", async (req, res) => {
    try {
        chatHistory = [instruction];
        res.json({message: "success", chatHistory});
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({error: `An error occurred ${error}.`});
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
