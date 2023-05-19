FROM ubuntu:23.04

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    unzip \
    gnupg2 \
    nikto \
    ruby-dev \
    libcurl4-openssl-dev \
    build-essential \
    && gem install wpscan

# Instalação do Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub |  apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable=113.0.5672.92-1

# ChromeDriver 
RUN mkdir /security-analysis && \
    wget -N https://chromedriver.storage.googleapis.com/112.0.5615.49/chromedriver_linux64.zip -P /tmp/ && \
    unzip /tmp/chromedriver_linux64.zip -d /security-analysis && \
    chmod +x /security-analysis && \
    ls /security-analysis


# Ambiente de desenvolvimento node


WORKDIR /security-analysis
#COPY package.json .
RUN apt install nodejs npm -y 
COPY . .
RUN cd src/app && npm install
#RUN mkdir -p src/app
#RUN cd src/app && npm install csv-parser -y && ls && pwd

