class ConflitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflitError';
  }
}

module.exports = ConflitError;
