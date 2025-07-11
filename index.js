const express = require("express");
const rateLimit = require("express-rate-limit");
const EmailService = require("./services/EmailService");

const app = express();
app.use(express.json());

// 🌐 Optional homepage route for sanity check
app.get("/", (req, res) => {
  res.send("✅ Email Sending Service is up and running!");
});

// 🚫 Rate limiter middleware for /send route
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // limit each IP to 5 requests per windowMs
  message: "Too many requests, try again later.",
});

app.use("/send", limiter);

// 📬 Email service instance
const emailService = new EmailService();

// 📮 POST /send route
app.post("/send", async (req, res) => {
  console.log("🔥 POST /send called");

  const { to, subject, body, requestId } = req.body;

  // Basic validation
  if (!to || !subject || !body || !requestId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const result = await emailService.sendEmail({ to, subject, body, requestId });
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
