FROM node:10.16.1

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install -g webpack webpack-cli webpack-dev-server
RUN npm install --save webpack webpack-cli webpack-dev-server
RUN npm install --save react react-dom
RUN npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
RUN npm install --save-dev html-webpack-plugin html-loader
RUN npm install --save axios
