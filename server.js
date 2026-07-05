const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Unsaid Song API Running");
});

app.post("/generate-song", async (req, res) => {
  const songData = req.body;

  console.log("Incoming Song Data:");
  console.log(songData);

  const prompt = `
Create a ${songData.genre} song in ${songData.language}.

Relationship:
${songData.relationship}

Beautiful Qualities:
${songData.qualities}

Special Moments:
${songData.moments}

Special Message:
${songData.message}

Create a heartfelt, emotional song that feels personal and memorable.

Build a strong melody, emotional progression, and a professional musical arrangement.
`;
`;

  console.log("Generated Prompt:");
  console.log(prompt);

  res.json({
    status: "success",
    prompt,
    apiKeyExists: !!process.env.STABILITY_API_KEY
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
