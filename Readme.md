# Security Analysis
## Sobre
Essa aplicação executa analises de segurança com foco em sites desenvolvidos com Wordpress. 
Essa aplicação automatiza a execução de analise de seguraça das seguintes feramentas; Nikto, Wpscan e security header. E emite os relatórios de cada ferramenta na pasta ../resultado.

## Instalação:
- Dependencia:
    - Docker (https://www.docker.com/products/docker-desktop/)
    - Docker compose (https://docs.docker.com/compose/install/)
## Uso:

- Para executar a aplicação basta rodar o comando:
~~~
docker-compose up --quiet-pull security-analysis
~~~
(Dentro da pasta)

Após o programa finalizar a execução, basta executar:
~~~
docker container stop chrome
~~~
Isso é para da um Stop no container selenium, para evitar gastos desdecessário de memória RAM.

---

- Caso tenha adicionado uma nova url e queira que essa url contabilize na execução, é necessário executar esses comandos:

~~~
docker-compose up --build --quiet-pull security-analysis


docker rmi $(docker images -f "dangling=true" -q)
~~~

O primeiro comando reconstroi a imagem, e os arquivos da pasta serão copiados para dentro do container com o novo arquivo `url.csv`.

O segundo comando, deve ser executado após o termino da aplicação ou abrindo outro terminal, esse comando apaga todas as imagens docker com tag ou repositório <none>. PODE APAGAR IMAGENS DOCKER EM DESENVOLVIMENTO.


