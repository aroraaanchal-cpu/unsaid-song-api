const express = require("express");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Unsaid Song API Running");
});

app.post("/generate-song", async (req, res) => {
  try {
    const songData = req.body;

    const prompt = `
Create a ${songData.genre} song in ${songData.language}.

Voice Preference:
${songData.voice}

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

    console.log("Generated Prompt:");
    console.log(prompt);

  const formData = new FormData();

formData.append("prompt", prompt);
formData.append("duration", "30");

const stabilityResponse = await axios.post(
  "https://api.stability.ai/v2beta/audio/stable-audio-2/text-to-audio",
  formData,
  {
    headers: {
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      Accept: "application/json",
      ...formData.getHeaders()
    }
  }
);

    console.log("Stability Response:");
    console.log(stabilityResponse.data);

    res.json({
      status: "success",
      prompt,
      audioUrl: "",
      stabilityResponse: stabilityResponse.data
    });
  } catch (error) {
    console.error("Stability Error:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    res.status(500).json({
      status: "error",
      message: error.message,
      details: error.response?.data
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
