class MockProviderB {
  constructor() {
    this.name = "ProviderB";
  }

  async send({ to, subject, body }) {
    if (Math.random() < 0.5) throw new Error("ProviderB failed");
    console.log(`✅ Email sent by ProviderB to ${to}`);
  }
}

module.exports = MockProviderB;
