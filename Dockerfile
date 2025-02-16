FROM node:18-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN git init && \
    git config --global --add safe.directory /app && \
    git config --global --add safe.directory /app/mdxFile && \
    git submodule init && \
    git submodule update --remote    

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/mdxFile ./mdxFile  

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]
