import { init } from "./initializer.ts";
import "./style.css";

const sdk = init({ environment: "DEV", clientToken: "token-aqui" });

const componenteLogin = sdk.renderAutenticacao();

componenteLogin.on("sucesso", () => {
  alert("Autenticado com sucesso");
});

componenteLogin.on("erro", () => {
  alert("Usuário ou senha inválido");
});
