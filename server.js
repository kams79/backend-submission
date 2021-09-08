import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import { bodyRoutes, pathRoutes, queryRoutes } from './src/routes/bookRoutes';

mongoose.connect('MONGODB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(bodyRoutes);
  server.route(pathRoutes);
  server.route(queryRoutes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
