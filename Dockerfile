FROM node:18.10.0-bullseye-slim AS build-env

ENV LC_ALL=C.UTF-8

RUN apt-get update && \
    apt-get install -y \
    curl \
    git

RUN curl -sSL https://bina.egoist.sh/egoist/dum | bash
