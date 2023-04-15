FROM node:18.16.0-alpine
WORKDIR /app
COPY --chown=node:node ./node_modules ./node_modules
COPY --chown=node:node ./dist ./dist
USER node
CMD ["node", "dist/main.js"]
EXPOSE 3000/tcp

