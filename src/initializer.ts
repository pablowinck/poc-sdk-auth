import { LoginComponent } from "./components/login-component";

type MfaSdkEnv = "DEV" | "HML" | "PRD";

interface MfaSdk {
  renderAutenticacao(): LoginComponent;
}

class _ImplMfaSdk implements MfaSdk {
  environment: MfaSdkEnv;
  clientToken: string;
  // ...e outras variáveis

  renderAutenticacao(): LoginComponent {
    const login = new LoginComponent();
    document
      .querySelector<HTMLDivElement>("#aegis-autenticacao")!
      .appendChild(login);
    return login;
  }
}

/**
 * Inicializa o SDK e retorna um objeto a ser usado para realizar as operações
 * da lib: renderizações e métodos utilitários.
 */
export function init(config: {
  environment: MfaSdkEnv;
  clientToken: string;
  // ...e outras variáveis
}): MfaSdk {
  const sdk = new _ImplMfaSdk();
  sdk.environment = config.environment;
  sdk.clientToken = config.clientToken;

  return sdk;
}
