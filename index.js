const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
});

app.listen(port, () => {
  console.log(`SNCvisionX AI backend running on port ${port}`);
});