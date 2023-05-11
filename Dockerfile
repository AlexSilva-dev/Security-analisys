FROM ubuntu:23.04

RUN apt-get update && apt-get install -y \
    apt-utils\
    curl \
    wget \
    unzip \
    gnupg2 






RUN apt-get install nikto -y


ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install ruby-dev -y
RUN apt install libcurl4-openssl-dev -y
RUN apt-get install -y build-essential

RUN gem install wpscan


RUN cd /tmp && wget -O chromium-browser.deb https://launchpad.net/ubuntu/+archive/primary/+files/chromium-browser_112.0.6961.80-0ubuntu1_amd64.deb
RUN dpkg -i /tmp/chromium-browser.deb
RUN sudo apt-get install -f

# ChromeDriver
# RUN apt install -y wget unzip 
#RUN mkdir /automocao-seleniun
#RUN wget -N https://chromedriver.storage.googleapis.com/112.0.5615.49/chromedriver_linux64.zip -P /tmp/
#RUN unzip /tmp/chromedriver_linux64.zip -d /automocao-seleniun
#RUN chmod +x /automocao-seleniun/chromedriver
