const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Unsaid Song API Running");
});

app.post("/generate-song", (req, res) => {
  const songData = req.body;

  console.log("Received Song Data:");
  console.log(songData);

  const prompt = `
Create a ${songData.genre} song.

Relationship:
${songData.relationship}

Beautiful Qualities:
${songData.qualities}

Special Moments:
${songData.moments}

Special Message:
${songData.message}

Language:
${songData.language}

Make the song emotional, personal and memorable.
`;

  res.json({
    status: "success",
    received: songData,
    prompt
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
