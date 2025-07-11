class MockProviderA {
  constructor() {
    this.name = "ProviderA";
  }

  async send({ to, subject, body }) {
    if (Math.random() < 0.7) throw new Error("ProviderA failed");
    console.log(`✅ Email sent by ProviderA to ${to}`);
  }
}

module.exports = MockProviderA;
