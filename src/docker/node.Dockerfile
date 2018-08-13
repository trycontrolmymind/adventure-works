FROM node:8.11.3

RUN mkdir /src
ADD . /src

WORKDIR /src
RUN yarn
