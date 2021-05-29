/* eslint-disable spaced-comment */
import mongoose from 'mongoose';
import BookSchema from '../models/bookModel';
import ReadPageError from '../error/readPageError';

const Book = mongoose.model('Book', BookSchema);

//#region post book
const postBookHandler = async (request, h) => {
  try {
    const { readPage, pageCount } = request.payload;

    if (readPage > pageCount) {
      throw new ReadPageError();
    }

    const book = new Book(request.payload);
    const result = await book.save({});
    const id = result.get('_id');
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { id },
    });
    response.code(200);

    return response;
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);

      return response;
    } if (e instanceof ReadPageError) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);

      return response;
    }
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);

    return response;
  }
};
//#endregion

//#region get all book
const getAllBooksHandler = async (request, h) => {
  const books = await Book.find({});
  const response = h.response({
    status: 'success',
    data: { books },
  });
  response.code(200);
  return response;
};
//#endregion

//#region get book by id
const getBookByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const book = await Book.findOne({ _id: id });
    let response;
    if (book !== null) {
      response = h.response({
        status: 'success',
        data: { book },
      });
      response.code(200);
    } else {
      throw new Error();
    }

    return response;
  } catch (e) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);

    return response;
  }
};
//#endregion

//#region update book
const updateBookHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const { name, readPage, pageCount } = request.payload;

    if (readPage > pageCount) {
      throw new ReadPageError();
    }
    if (name === undefined) {
      throw new mongoose.Error.ValidationError();
    }

    // eslint-disable-next-line no-unused-vars
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, request.payload, { new: true });
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);

    return response;
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);

      return response;
    } if (e instanceof ReadPageError) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);

      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);

    return response;
  }
};
//#endregion

//#region delete book by id
const deleteBookByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const removedBook = await Book.deleteOne({ _id: id });
    const removeStat = removedBook.n;
    let response;
    if (removeStat === 1) {
      response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
    } else {
      throw new Error();
    }
    return response;
  } catch (e) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);

    return response;
  }
};
//#endregion

//#region query parameter get book by name
const getBookByNameHandler = async (request, h) => {
  const { name } = request.query;
  const query = { name: new RegExp(`^${name}$`, 'i') };
  const books = await Book.find(query);
  const response = h.response({
    status: 'success',
    data: { books },
  });
  response.code(200);
  return response;
};
//#endregion

//#region query parameter get finish book by status
const getBookFinishedHandler = async (request, h) => {
  const { name } = request.query;
  const query = { name: new RegExp(`^${name}$`, 'i') };
  const books = await Book.find(query);
  const response = h.response({
    status: 'success',
    data: { books },
  });
  response.code(200);
  return response;
};
//#endregion

//#region query parameter get read book by status
const getBookReadHandler = async (request, h) => {
  const { name } = request.query;
  const query = { name: new RegExp(`^${name}$`, 'i') };
  const books = await Book.find(query);
  const response = h.response({
    status: 'success',
    data: { books },
  });
  response.code(200);
  return response;
};
//#endregion

export {
  postBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookByIdHandler,
  getBookByNameHandler,
  getBookFinishedHandler,
  getBookReadHandler,
};
