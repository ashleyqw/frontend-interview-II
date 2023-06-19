FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm i
CMD ["npm", "run", "start"]
