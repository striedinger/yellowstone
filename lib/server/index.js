require('dotenv').config();
import "core-js/stable";
import "regenerator-runtime/runtime";
import compression from 'compression';
import express from 'express';
import renderer from './routes/renderer';

import paths from '../../config/paths';

const app = express();

app.use(compression());

app.use(paths.publicPath, express.static(paths.clientBuild));

app.use(renderer);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port ${server.address().port}`);
});

export default app;
