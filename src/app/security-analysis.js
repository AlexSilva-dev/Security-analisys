const { execSync } = require('child_process');
const fs = require('fs');
const csv = require('csv-parser');
const AutoSecurityHeader = require('./auto-security-header');
const PATH_RESULT='/security-analysis/resultado/'
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';

class Main {



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



  executingCommand(command, showMessage=true) {
    try {
      const output = execSync(command);
      if(showMessage=true){
        console.log('Executado com sucesso.');
      }
    } catch (error) {
      console.error(`Ocorreu um erro ao executar '${command}'\nErro: ${error}`);
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

  run() {

    this.input()
      .then((urls) => {
        //console.log(urls);
        urls.forEach((item) => {
          const url = item[Object.keys(item)];
          let name = this.nameUrl(url);
          let objAutoSecurityHeader = new AutoSecurityHeader();
          this.executingCommand('ls')
          console.log("Executando Nikto para " + url)
          this.executingCommand(`nikto -h ${url} -o /security-analysis/resultado/nikto${name}.html`)
          console.log("Executando Wpscan para " + url)
          this.executingCommand(`wpscan --url ${url} --force --clear-cache --output  /security-analysis/resultado/wpscan${name}.txt`);
          objAutoSecurityHeader.run(url, name);
          console.log("\n\n");
        });
        console.log(GREEN + "Execução finalizada com sucesso, os resultados foram gerandos na pasta ../resultados.\n"+RESET);
        console.log(`${GREEN}Execute o comando "docker container stop chrome" para o container do selenium.${RESET} ALTAMENTE RECOMENDADO APÓS O USO DESSA APLICAÇÃO.`);
        console.log(`${RED}Execute o comando "docker image prune -a --force" PARA APAGAR TODAS AS IMAGENS DOCKER (atenção nesse comando, se não tiver interesse em apagar a aplicação Security Analysis ou se tiver usando o docker para outras finalidades  NÃO EXECUTA ESSE COMANDO).${RESET}`);
        this.executingCommand(`chmod -R 777 ${PATH_RESULT}`, false)
      })
      .catch((error) => {
        console.error(error);
        // Trate o erro aqui, se necessário
      });
    

  }
}

const main = new Main();
main.run();