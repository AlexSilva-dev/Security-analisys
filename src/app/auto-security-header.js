const webdriver = require('selenium-webdriver');
const { Builder, Capabilities } = webdriver
let capabilities = Capabilities.chrome();
const fs = require('fs');
const net = require('net');


class AutoSecurityHeader {


    waitForPort(host, port, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error(`Timeout waiting for ${host}:${port} to be available`));
            }, timeout);

            const checkPort = () => {
                const socket = net.createConnection(port, host);
                socket.once('error', () => {
                    // Ainda não está disponível, aguardar e tentar novamente
                    setTimeout(checkPort, 1000);
                });
                socket.once('connect', () => {
                    // Porta está ouvindo, resolver a promise
                    clearTimeout(timer);
                    socket.end();
                    resolve();
                });
            };

            checkPort();
        });
    }

    async run(url, siteName) {

        // Espera a porta do container docker ouvir para continuar o cod
        await this.waitForPort('chrome', 4444)
            .then(() => {
                
                // Escolhi não colocar nada aqui, mas o cod pode ser direto aqui dentro 
            })
            .catch((error) => {
                // Se ocorrer um erro sai do programa
                console.error('Ocorreu um erro ao se conectar com a porta do selenium (auto-security-header.js>run()):\n', error);
                return;
            });

        // Cria a conexão com o container com o selenium/standalone-chrome
        let driver;
        driver = await new Builder()
            .usingServer('http://chrome:4444')
            .withCapabilities(capabilities)
            .build();

        try {

            await driver.get(`https://securityheaders.com/?q=${url}&followRedirects=on`); // Eu estou mandando paramentros (que no caso é a url que quero realizar o teste de segurança) pela url do security header

            //console.log(await driver.getPageSource())

            let screenshot = await driver.takeScreenshot();
            await fs.writeFileSync(`/security-analysis/resultado/SecurityHeader-${siteName}.png`, screenshot, 'base64');

        } catch {
            console.log('Erro')
        } finally {
            await driver.quit();
        }


    }
}

module.exports = AutoSecurityHeader;
/*
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { remote } = require('webdriverio');



class AutoSecurityHeader {


    typeURL(url) {

        // Localizar o elemento pelo XPath
        let inputElement = driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[1]/div/div[2]/header/form/div/div[1]/input[1]'));
        // Digitar texto no elemento
        inputElement.sendKeys(url);

    }

    doAnalysis() {
        let buttonScan = driver.findElement(webdriver.By.xpath('/html/body/div[1]/div[1]/div/div[2]/header/form/div/div[1]/input[2]'));
        buttonScan.click();
        driver.sleep(5);
    }


    print(siteName) {
        let screenshot = driver.takeScreenshot();
        // Salvar o screenshot em um arquivo
        try {
            fs.writeFileSync(`/security-analysis/resultado/SecurityHeader-${siteName}.png`, screenshot, 'base64');
            console.log('Screenshot salvo com sucesso!');
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        } finally {
            // Fechar o navegador
            driver.quit();
        }
    }


    run(url, siteName) {

        /*
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless'); // Execução sem interface gráfica
        chromeOptions.addArguments('--no-sandbox');
        chromeOptions.addArguments('--disable-gpu');



        const driver = new Builder()
            .forBrowser('chrome')
            .usingServer('http://chrome:4444/wd/hub') // URL do servidor Selenium no container 'chrome'
            .setChromeOptions(chromeOptions)
            .build();


        try {
            driver.get('https://securityheaders.com');
            typeURL(url);
            doAnalysis();
            print(siteName);
        } catch {

        }    
        /
        const chromeOptions = {
            hostname: '172.19.0.2', // ou o IP do servidor do Selenium Grid
            port: 4444, // a porta do servidor do Selenium Grid
            capabilities: {
                browserName: 'chrome', // o nome do navegador desejado
            },
        };

        const browser = remote(chromeOptions);

        try {
            browser.url('https://www.google.com');
            browser.pause(2000); // aguarda 2 segundos para fins ilustrativos
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        } finally {
            browser.deleteSession();
        }



        

    }
}

module.exports = AutoSecurityHeader;

*/