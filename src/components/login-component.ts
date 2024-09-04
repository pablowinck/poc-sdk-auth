import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type LoginHandlerTypes =
  | "sucesso"
  | "erro"
  | "esqueci-minha-senha"
  | "primeiro-acesso";

interface ComponenteLogin {
  /**
   * Registra um handler chamado quando o usuário conseguir logar com sucesso.
   */
  on(
    event: "sucesso",
    handler: (e: {
      username: string;
      userId: string;
      accessToken: string;
      refreshToken: string;
    }) => void
  ): void;
  /**
   * Registra um handler chamado quando houver algum erro no login.
   * O componente não ficará em um estado inválido, e não é necessário
   * redirecionar. O handler pode logar o erro e opcionalmente mostrar um modal.
   */
  on(event: "erro", handler: (e: Error) => void): void;
  /**
   * Registra um handler chamado quando o usuário indicar que esqueceu a senha.
   * Use este handler para redirecionar o usuário.
   */
  on(event: "esqueci-minha-senha", handler: () => void): void;
  /**
   * Registra um handler chamado quando o usuário indicar que é seu primeiro
   * acesso (e neste caso ele ainda não terá uma senha para usar). Use este
   * handler para direcionar o usuário para a jornada de primeiro acesso.
   */
  on(event: "primeiro-acesso", handler: () => void): void;
}

@customElement("login-component")
export class LoginComponent extends LitElement implements ComponenteLogin {
  @property({ type: String }) username = "";
  @property({ type: String }) password = "";

  private _handlerSucesso: Function = () => {};
  private _handlerErro: Function = () => {};

  private _login() {
    console.log(`Username: ${this.username}, Password: ${this.password}`);
    if (this.username == "admin" && this.password == "1234") {
      this._handlerSucesso();
      return;
    }

    this._handlerErro();
  }

  public on(event: LoginHandlerTypes, handler: Function) {
    if (event === "sucesso") {
      this._handlerSucesso = handler;
    } else if (event === "erro") {
      this._handlerErro = handler;
    }
  }

  render() {
    return html`
      <main>
        <h1>Aegis Login</h1>
        <div class="login-form">
          <input
            type="text"
            placeholder="Username"
            .value=${this.username}
            @input=${(e: Event) =>
              (this.username = (e.target as HTMLInputElement).value)}
          />
          <input
            type="password"
            placeholder="Password"
            .value=${this.password}
            @input=${(e: Event) =>
              (this.password = (e.target as HTMLInputElement).value)}
          />
          <button @click=${this._login}>Login</button>
        </div>
      </main>
    `;
  }

  static styles = css`
    main {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      width: 300px;
      margin: auto;
    }
    .login-form input {
      margin: 10px 0;
      padding: 10px;
      font-size: 1em;
    }
    .login-form button {
      padding: 10px;
      font-size: 1em;
      cursor: pointer;
    }
  `;
}
