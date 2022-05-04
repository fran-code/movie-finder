FROM node:12.19.0 as base
WORKDIR '/app'
ENV NODE_ENV production
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4004
CMD ["npm", "run", "docker-start"] 