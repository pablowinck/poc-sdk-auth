import { LoginComponent } from "./components/login-component";
import { changeComponentToFullScreen } from "./utils/change-component-to-full-screen";

type MfaSdkEnv = "DEV" | "HML" | "PRD";

interface MfaSdkThemeConfig {
  theme: string | undefined;
  assets: {
    logo: string | undefined;
  };
}

interface MfaSdk {
  renderAutenticacao(): LoginComponent;
}

class _ImplMfaSdk implements MfaSdk {
  environment: MfaSdkEnv | undefined;
  clientToken: string | undefined;
  themeConfig: MfaSdkThemeConfig | undefined;
  // ...e outras variáveis
  static #nomeProjeto: string = "Aegis";
  static ID_AUTENTICACAO: string = `#${this.#nomeProjeto.toLowerCase()}-autenticacao`;

  renderAutenticacao(): LoginComponent {
    const login = new LoginComponent({ logo: this.themeConfig?.assets.logo });
    const container = document.querySelector<HTMLDivElement>(
      _ImplMfaSdk.ID_AUTENTICACAO
    );
    container!.appendChild(login);
    changeComponentToFullScreen(login);
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
  themeConfig: MfaSdkThemeConfig;
  // ...e outras variáveis
}): MfaSdk {
  const sdk = new _ImplMfaSdk();
  sdk.environment = config.environment;
  sdk.clientToken = config.clientToken;
  sdk.themeConfig = config.themeConfig;

  return sdk;
}
