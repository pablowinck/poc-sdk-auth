# POC SDK de Autenticação

Esta Prova de Conceito (POC) para uma SDK de autenticação visa fornecer uma maneira simplificada e padronizada para implementar telas de login, recuperação de senha e autenticação multifator (MFA) em aplicações front-end.

## Recursos

- Renderização de componente de autenticação.
- Suporte para temas claros e escuros.
- Manipulação de eventos de login como sucesso, erro, esqueci minha senha e primeiro acesso.

## Estrutura do Projeto

O projeto está dividido em vários módulos principais:

- `src/`: Contém os componentes principais da SDK, incluindo o inicializador e os componentes de login.
- `src/components/`: Componentes reutilizáveis, incluindo o componente de login.
- `src/themes/`: Temas (claro e escuro) disponíveis para os componentes.
- `src/utils/`: Funções utilitárias, como a função para transformar componentes em tela cheia.

## Configuração

Este projeto utiliza TypeScript e é construído com Vite. Para configurar o ambiente de desenvolvimento e construir o projeto, siga os passos abaixo:

1. Instale as dependências com `npm install`.
2. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento.
3. Utilize `npm run build` para gerar os arquivos de produção.

## Testes

Execute `npm run test` para rodar os testes unitários e verificar a integridade dos componentes e suas funcionalidades.

## Integração

### Vanilla (HTML/JS)

1. Inclua o script gerado no build no seu arquivo HTML.

   ```html
   <script src="./dist/mfa-sdk.umd.js"></script>
   ```



2. Inicialize a SDK e renderize o componente de autenticação:

   ```javascript
   const sdk = MfaSdk.init({
     environment: "DEV",
     clientToken: "token-aqui",
     themeConfig: {
       theme: "light",
       assets: { logo: "https://v4.vitejs.dev/logo.svg" },
     },
   });

   const componenteLogin = sdk.renderAutenticacao();

   componenteLogin.on("sucesso", () => {
     alert("Autenticado com sucesso");
   });

   componenteLogin.on("erro", () => {
     alert("Usuário ou senha inválido");
   });
   ```

3. Inclua o container de autenticação no seu HTML:

   ```html
   <div id="aegis-autenticacao"></div>
   ```

### React (Next.js)

1. Importe o SDK de autenticação dinamicamente:

   ```javascript
   useEffect(() => {
     import("poc-sdk-auth").then((module) => {
       const sdk = module.init({
         environment: "DEV",
         clientToken: "token",
         themeConfig: {
           theme: "light",
           assets: { logo: "https://nextjs.org/icons/next.svg" },
         },
       });

       const component = sdk.renderAutenticacao();
       component.on("erro", () => {
         console.log("Erro ao logar");
       });
     });
   }, []);
   ```

2. Adicione o container de autenticação no JSX:

   ```jsx
   <div id="aegis-autenticacao"></div>
   ```

### Angular

1. Inicialize o SDK e renderize o componente de autenticação no `ngOnInit`:

   ```typescript
   import { Component } from "@angular/core";
   import { init } from "poc-sdk-auth";

   @Component({
     selector: "app-root",
     templateUrl: "./app.component.html",
     styleUrl: "./app.component.css",
   })
   export class AppComponent {
     ngOnInit(): void {
       const sdk = init({
         environment: "DEV",
         clientToken: "token",
         themeConfig: {
           theme: "light",
           assets: {
             logo: "https://v17.angular.io/assets/images/logos/angular/logo-nav@2x.png",
           },
         },
       });

       const component = sdk.renderAutenticacao();
       component.on("erro", () => {
         console.log("Erro ao logar");
       });
     }
   }
   ```

2. Inclua o container de autenticação no template HTML:

   ```html
   <div id="aegis-autenticacao"></div>
   ```
