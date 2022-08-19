<h1 align="center">Angular Starterkit Dragon Venture Capital</h1>

<p align="center">
  <img src="src\assets\images\logo\logo-sm.svg" alt="dragon-logo" width="360px" height="120px"/>
  <br/>
  <br/>
</p>

<p align="center">
  <a href="https://angular-starterkit.netlify.app/"><strong>https://angular-starterkit.netlify.app/</strong></a>
  <br>
</p>

<p align="center">
  <a href="https://app.netlify.com/sites/angular-starterkit/deploys">
    <img src="https://api.netlify.com/api/v1/badges/bfb73e88-082e-4c42-ae73-89807001fe64/deploy-status?branch=main" alt="Netlify Status" />
  </a>
</p>

<hr>

## Setup de Desenvolvimento

### Pré-requisitos

- Node.js v16.15.1
- Angular 14
- Bootstrap 5

#### Opcionais

- Gulp v4

### Configurando o projeto

Baixe o projeto

```
git clone https://github.com/DragonVentureCapital/angular-starterkit.git
```

Instale as dependências

```
npm install
```

Renomeie o projeto nos arquivos `angular.json` e `package.json` através da busca do vscode

```
Ctrl + Shift + F --> starterkit
```

ou através do comando

```
gulp rename --name [NOME DO PROJETO]
```

### Configurando o GIT

Remova o atual diretório `.git` deletando pelo explorador de arquivos ou com o comando

```
rm -rf .git
```

Inicialize um novo repositório com o remote do novo repositório

```
git init
git add .
git commit -m "First Commit"
git branch -M main
git remote add origin <github-url>
git push -u origin main
```

## Primeiros Passos

### Escolhendo Tema

Inicialize o projeto com

```
ng s -o
```

No menu flutuante da lateral escolha as configurações de cores, sidebar e tema.

Clique em Configuração para ver as instruções de troca de tema.

Para garantir que as cores do seu tema sempre sejam respeitas, caso a propriedade `color` da sua configuração seja outra além de `color-1` lembre-se de substituir o conteúdo de `src/assets/scss/_style.scss` pelo de `src/assets/scss/color-{*}.scss`

Caso seja de sua opção manter a possíbilidade de ter vários temas no projeto, o comando

```
gulp
```

Auxilia na criação dos arquivos estáticos dinâmicos. Utilize-o sempre que algum arquivo scss dentro de `src/assets/scss/theme/` for alterado ou vincule ele ao comando de build do netlify para garantir que o css sempre esteja atualizado com

```
gulp && ng build --configuration prod
```

### Remoção do módulo de exemplo

Em sua base o projeto contém um módulo de exemplo dentro de `src/app/pages/example`, sinta-se livre para remover o módulo, bem como seus componentes.

Ao remover o módulo de exemplo lembre-se de remover também sua rota dentro de `src/app/app-routing.module.ts`

### Configurando o env

O projeto já conta com `base.service.ts` que deve ser utilizado nos novos services para fazer chamadas na API.

Ele utiliza as urls dentro dos arquivos da pasta `src/environments/`. Basta alterar essas urls dentro do env para que as novas requsições já batam nessa API.

## Tudo Pronto!

Se os passos acima foram seguidos, só resta agora colocar a mão na massa e construir mais um projeto muito f#d@!!!
