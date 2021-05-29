import {
  postBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookByIdHandler,
  getBookByNameHandler,
} from '../handler/bookHandler';

const bodyRoutes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
];

const pathRoutes = [
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

const queryRoutes = [
  {
    method: 'GET',
    path: '/books/',
    handler: getBookByNameHandler,
  },
];

export { bodyRoutes, pathRoutes, queryRoutes };
