FROM node:20-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    graphicsmagick \
    libwebp-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN chmod -R 777 /app

ENV PORT=7860
EXPOSE 7860

CMD ["node", "index.js"]
