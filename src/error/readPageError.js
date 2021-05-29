class ReadPageError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'ReadPageError'; // (2)
  }
}

export default ReadPageError;
