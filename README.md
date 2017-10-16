# @MediaPost #

Este projeto é referente ao teste para a vaga de desenvolvedor Front-End na empresa @MediaPost

### How to Use ###

* Baixe ou faça um fork desse projeto.
* Acesse a pasta do projeto pelo prompt de comando e digite `npm install`
* Espere terminar a instalação das dependecias do projeto, após concluido basta usar o comando `npm start`

**Atenção**: Para rodar o projeto é preciso ter o Node.js instalado na máquina, você baixa-ló em [Node](https://nodejs.org/en/).
 
**Atenção**: Para o correto funcionamento do plugin *grunt-contrib-sass* é necessário ter o [Sass](http://sass-lang.com/) e o [Ruby](https://rubyinstaller.org/downloads/) instalados.

### Técnologias Utilizadas ###

* HTML5
* CSS 3
* Framework CSS [Bootstrap 4](http://getbootstrap.com/)
* Icon Fonts [Open Iconic](https://useiconic.com/open/)
* [Grunt](https://gruntjs.com/) - Task Runner
* JavaScript ES6 + [TypeScript](https://www.typescriptlang.org/)

### Estrutura de Pastas ###

+ dev: Pasta de desenvolvimento contendo todos os arquivos editavéis
    * lib: Pasta para adição de bibliotecas/plugin Javascript
    + scss: Pasta contendo os arquivos Sass do projeto
        * main.scss: Arquivo Sass principal responsável por importar os demais arquivos
    + ts: Pasta contendo os arquivos Typescript do projeto
        * index.ts: Arquivo typescript principal
+ public: Pasta onde serão compilados os arquivos de desenvolvimento para a produção, essa é a pasta que deverá subir para o servidor
    * css: Pasta contendo o arquivo css minificado e concatenado que será usado pelo arquivo index.html
    * js: Pasta contendo os arquivos JS processados pelo compilador do TypeScript e uma versão minificada e concatenada de todos os arquivos de bibliotecas/plugins adicionadas a pasta dev/lib
    * index.html: Arquivo html principal contendo todo o código html chamada para os demais arquivos da pasta public prontos para produção