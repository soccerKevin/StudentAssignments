import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from 'sa/webpack.config.js'
import routers from 'sa/src/server/routers/index.js'
import bodyParser from 'body-parser'

const compiler = webpack(webpackConfig);

const app = express();

const port = 3000;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)

app.use(bodyParser.json());

routers.forEach(({ path, router }) => {
  app.use(path, router)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
