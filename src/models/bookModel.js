/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
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

// BookSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.name;
//     delete returnedObject.year;
//     delete returnedObject.author;
//     delete returnedObject.summary;
//     delete returnedObject.pageCount;
//     delete returnedObject.readPage;
//     delete returnedObject.finished;
//     delete returnedObject.reading;
//     delete returnedObject.insertedAt;
//     delete returnedObject.updatedAt;
//   },
// });

BookSchema.method('toClient', function () {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  delete obj.year;
  delete obj.author;
  delete obj.summary;
  delete obj.pageCount;
  delete obj.readPage;
  delete obj.finished;
  delete obj.reading;
  delete obj.insertedAt;
  delete obj.updatedAt;

  return obj;
});

BookSchema.method('toAll', function () {
  const obj = this.toObject();

  if (obj.pageCount === obj.readPage) {
    obj.finished = true;
  } else {
    obj.finished = false;
  }

  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;

  return obj;
});

export default BookSchema;
