FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD ["./backend_on_start_script.sh"]
