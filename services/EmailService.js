const ProviderA = require("../providers/MockProviderA");
const ProviderB = require("../providers/MockProviderB");

const statusMap = new Map();
const sentRequests = new Set();

class EmailService {
  constructor() {
    this.providers = [new ProviderA(), new ProviderB()];
  }

  async sendEmail({ to, subject, body, requestId }) {
    if (sentRequests.has(requestId)) {
      return { status: "duplicate", message: "Already processed" };
    }

    sentRequests.add(requestId);

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      let attempt = 0;

      while (attempt < 3) {
        try {
          await provider.send({ to, subject, body });
          statusMap.set(requestId, { provider: provider.name, success: true });
          return { status: "sent", provider: provider.name };
        } catch (err) {
          attempt++;
          await new Promise(res => setTimeout(res, Math.pow(2, attempt) * 100));
        }
      }
    }

    statusMap.set(requestId, { provider: null, success: false });
    throw new Error("All providers failed");
  }
}

module.exports = EmailService;
