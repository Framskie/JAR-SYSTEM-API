import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Generic Roblox API proxy
app.get("/proxy", async (req, res) => {
  const target = req.query.url;

  // Security: prevent abuse
  if (!target || !target.startsWith("https://")) {
    return res.status(400).json({ error: "Invalid or missing URL parameter" });
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "RobloxProxy/1.0",
        "Accept": "application/json"
      }
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch target URL", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Roblox Proxy running on port ${PORT}`));
