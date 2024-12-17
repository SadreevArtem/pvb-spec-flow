FROM node:16.15-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . ./
RUN npm run build

FROM node:16.15-alpine AS backend
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js ./
COPY ./src/templates ./dist/templates
COPY ./src/excel-service/fonts ./dist/excel-service
RUN mkdir uploads

ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js" ]
