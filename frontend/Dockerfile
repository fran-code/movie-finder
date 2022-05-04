FROM node:alpine
WORKDIR /app
ENV REACT_APP_ENV production
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]