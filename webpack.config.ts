import * as path from 'path'

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: path.join(__dirname, 'vote', 'App.tsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
