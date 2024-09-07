const axios = require("axios");

const getResponse = async (req, res) => {
  // console.log("FIX HARCODED RESPONSE");

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Act as a customer support agent for SupportDesk.",
          },
          {
            role: "user",
            content: `Provide a summarized technical solution to the issue described next, and ask any general follow-up questions if needed.
                If the issue is unclear or cannot be resolved, politely ask for more details or suggest seeking further assistance:\n\n${text}`,
          },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    const greeting = "Thank you for contacting SupportDesk, \n\n";
    const goodbye =
      "\n\nYour inquiry is important to us. This response was auto-generated, so please verify the information provided.";
    // const summary = greeting + "CHAT GPT RESPONSE TEXT PLACEHOLDER . . ." + goodbye;
    const summary = greeting + aiResponse + goodbye;
    res.json({ summary });
  } catch (error) {
    console.error(
      "Error fetching summary:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to generate summary" });
  }
};

module.exports = {
  getResponse,
};
