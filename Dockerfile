FROM ubuntu:23.04

RUN apt-get update && apt-get install -y \
    apt-utils\
    curl \
    wget \
    unzip \
    gnupg2 

#nikto
RUN apt-get install nikto -y

#wpscan
RUN apt-get install ruby-dev -y
RUN apt install libcurl4-openssl-dev -y
RUN apt-get install -y build-essential
RUN gem install wpscan

#instalação Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub |  apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN  apt update
RUN apt-cache policy google-chrome-stable
RUN  apt install google-chrome-stable=113.0.5672.92-1 -y


# ChromeDriver
RUN apt install -y wget unzip 
RUN mkdir /automocao-seleniun
RUN wget -N https://chromedriver.storage.googleapis.com/112.0.5615.49/chromedriver_linux64.zip -P /tmp/
RUN unzip /tmp/chromedriver_linux64.zip -d /automocao-seleniun
RUN chmod +x /automocao-seleniun/chromedriver
RUN ls /automocao-seleniun
