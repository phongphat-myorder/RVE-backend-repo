FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY tsconfig.json ./

COPY src ./src

ARG APP_ENV
ARG PORT
ARG EMAIL_USER
ARG EMAIL_PASS
ARG MONGO_URL
ARG REDIS_URL

ENV APP_ENV=${APP_ENV}
ENV PORT=${PORT}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}
ENV MONGO_URL=${MONGO_URL}
ENV REDIS_URL=${REDIS_URL}

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

ARG APP_ENV
ARG PORT
ARG EMAIL_USER
ARG EMAIL_PASS
ARG MONGO_URL
ARG REDIS_URL

ENV APP_ENV=${APP_ENV}
ENV PORT=${PORT}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}
ENV MONGO_URL=${MONGO_URL}
ENV REDIS_URL=${REDIS_URL}

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/index.js"]