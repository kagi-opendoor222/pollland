const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const environment = process.env.NODE_ENV || 'development';

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  // mode: "development",
  resolve: {
    alias: {
      userEnv$: path.resolve(__dirname, `env/${environment}.js`)
    }
  },
  module:{
    rules: [
      {
        test: /.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {url: false}
          },
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    inline: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    historyApiFallback: true
    // proxy: {
    //   '/api': {
    //       target: 'http://localhost:4000', // local api server
    //       pathRewrite: {'^/api' : ''} // rewrite
    //   }
    // }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}
