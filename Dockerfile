FROM ubuntu:23.04

RUN apt-get update && apt-get install -y \
    nikto \
    ruby-dev \
    libcurl4-openssl-dev \
    build-essential \
    nodejs \
    npm \
    && gem install wpscan

RUN mkdir /security-analysis && \
    ls /security-analysis


# Ambiente de desenvolvimento node
WORKDIR /security-analysis
COPY . .
RUN cd src/app && npm install