import { expect, jest } from "@jest/globals";
import { fixture, html } from "@open-wc/testing";
import "./login-component";
import { LoginComponent } from "./login-component";

describe("LoginComponent", () => {
  it("renders the login form with the correct structure", async () => {
    const el = await fixture<LoginComponent>(
      html`<login-component></login-component>`
    );

    // Aguarda o componente finalizar sua renderização
    await el.updateComplete;

    // Verifica se o componente renderizou o título correto
    expect(el.shadowRoot!.querySelector("h1")?.textContent).toEqual(
      "Aegis Login"
    );

    // Verifica se o logo não é exibido por padrão
    expect(el.shadowRoot!.querySelector("img")).toBeNull();

    // Verifica se o input de username está presente
    const usernameInput = el.shadowRoot!.querySelector('input[type="text"]');
    expect(usernameInput).toBeDefined();
    expect(usernameInput?.getAttribute("placeholder")).toEqual("Username");

    // Verifica se o input de password está presente
    const passwordInput = el.shadowRoot!.querySelector(
      'input[type="password"]'
    );
    expect(passwordInput).toBeDefined();
    expect(passwordInput?.getAttribute("placeholder")).toEqual("Password");

    // Verifica se o botão de login está presente
    const loginButton = el.shadowRoot!.querySelector("button");
    expect(loginButton).toBeDefined();
    expect(loginButton?.textContent).toEqual("Login");
  });

  it("executes login with correct credentials", async () => {
    const el = await fixture<LoginComponent>(
      html`<login-component></login-component>`
    );

    // Configura handlers para sucesso e erro
    const onSuccess = jest.fn();
    const onError = jest.fn();

    el.on("sucesso", onSuccess);
    el.on("erro", onError);

    // Define valores válidos para username e password
    el.username = "admin";
    el.password = "1234";

    // Simula o clique no botão de login
    const loginButton = el.shadowRoot!.querySelector("button");
    loginButton?.click();

    // Verifica se o handler de sucesso foi chamado
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("executes login with incorrect credentials", async () => {
    const el = await fixture<LoginComponent>(
      html`<login-component></login-component>`
    );

    // Configura handlers para sucesso e erro
    const onSuccess = jest.fn();
    const onError = jest.fn();

    el.on("sucesso", onSuccess);
    el.on("erro", onError);

    // Define valores inválidos para username e password
    el.username = "admin";
    el.password = "wrongpassword";

    // Simula o clique no botão de login
    const loginButton = el.shadowRoot!.querySelector("button");
    loginButton?.click();

    // Verifica se o handler de erro foi chamado
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });
});
