FROM node:22.7-bookworm-slim

RUN npm uninstall -g yarn
RUN rm -rf /usr/local/bin/yarn
RUN rm -rf /usr/local/bin/yarnpkg
RUN corepack enable
RUN yarn set version canary

USER node

CMD ["tail", "-f", "/dev/null"]
