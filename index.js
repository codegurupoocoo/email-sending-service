const express = require("express");
const rateLimit = require("express-rate-limit");
const EmailService = require("./services/EmailService");

const app = express();
app.use(express.json());

// ✅ Optional root route for browser sanity check
app.get("/", (req, res) => {
  res.send("✅ Email Sending Service is up and running! Use POST /send");
});

// 🚫 Rate limiting to protect /send endpoint
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5,              // limit each IP to 5 requests per window
  message: { error: "Too many requests, try again later." },
});
app.use("/send", limiter);

// 📬 Email service setup
const emailService = new EmailService();

// 📮 POST /send - main endpoint
app.post("/send", async (req, res) => {
  console.log("📩 POST /send hit");

  const { to, subject, body, requestId } = req.body;

  if (!to || !subject || !body || !requestId) {
    return res.status(400).json({ error: "Missing required fields: to, subject, body, requestId" });
  }

  try {
    const result = await emailService.sendEmail({ to, subject, body, requestId });
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Export app for Vercel
module.exports = app;

// ✅ Local development support
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
  });
}
