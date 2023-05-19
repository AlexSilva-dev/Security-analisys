const { execSync } = require('child_process');
const fs = require('fs');
const csv = require('csv-parser');
const AutoSecurityHeader = require('./auto-security-header');

class Main{



    input() {
        return new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream('urls.csv')
            .pipe(csv())
            .on('data', (data) => {
              results.push(data);
            })
            .on('end', () => {
              resolve(results);
            })
            .on('error', (error) => {
              reject(error);
            });
        });
      }
      


      executingCommand(command) {
        try {
          const output = execSync(command);
          console.log('O comando foi executado com sucesso.');
        } catch (error) {
          console.error('Ocorreu um erro ao executar o comando:', error);
        }
      }
          
    nameUrl(url) {
      // Remove "https://"
      let nameUrl = url.replace('https://', '');
    
      // Remove "www."
      nameUrl = nameUrl.replace('www.', '');
    
      // Remove ".com/"
      nameUrl = nameUrl.replace('.com', '').replace('.br', '').replace("/", '');
    
      return nameUrl;
    }

    run(){

        let i=0;
        this.input()
            .then((urls) => {
            //console.log(urls);
            urls.forEach((item) =>{
                const url = item[Object.keys(item)];
                let objAutoSecurityHeader = new AutoSecurityHeader();
                this.executingCommand('ls')
                objAutoSecurityHeader.run(url, this.nameUrl(url));
                //this.executingCommand(`nikto -h ${url} -o /security-analysis/resultado/nikto${i}.html`)
                //this.executingCommand(`wpscan --url ${urls[0]} --force --clear-cache`);
                i++;
            });
                })
            .catch((error) => {
            console.error(error);
            // Trate o erro aqui, se necessário
            });
            
        
    }
}

const main = new Main();
main.run();