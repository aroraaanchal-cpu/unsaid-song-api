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

  res.json({
    status: "success",
    received: songData
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
