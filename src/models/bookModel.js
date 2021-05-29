import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema({
  name: {
    type: String,
    required: 'Enter book name',
  },
  year: { type: Number },
  author: { type: String },
  summary: { type: String },
  publisher: { type: String },
  pageCount: { type: Number },
  readPage: { type: Number },
  finished: { type: Boolean },
  reading: { type: Boolean },
  insertedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default BookSchema;
