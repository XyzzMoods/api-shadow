// file: server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// === ROUTES DEMO ===

// Root
app.get("/", (req, res) => {
  res.json({ status: "Shadow Api Online!", author: "XyzzMoods" });
});

// Cek IP
app.get("/api/ip", async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip });
  } catch (e) {
    res.status(500).json({ error: "Gagal ambil IP" });
  }
});

// Quotes Random
app.get("/api/quotes", (req, res) => {
  const quotes = [
    "Jangan gabut, codinglah 🧑‍💻",
    "Tidur itu juga solusi 🤣",
    "Mimpi besar dimulai dari ngulik kecil.",
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

// YouTube Downloader (contoh pakai API eksternal)
app.get("/api/ytdl", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Kasih parameter ?url=" });
  try {
    // Contoh fetch dari API pihak ketiga
    const result = await axios.get(`https://yttomp4.pro/${url}`);
    res.json(result.data);
  } catch (e) {
    res.status(500).json({ error: "Gagal fetch data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API jalan di http://localhost:${PORT}`);
});