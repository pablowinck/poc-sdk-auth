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

interface ConfigMfaSdk {
  environment: MfaSdkEnv;
  clientToken: string;
  themeConfig: MfaSdkThemeConfig;
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
    if (!container) {
      throw new Error("Container não encontrado");
    }
    // Essa tratativa é necessária para evitar re-renderizações desnecessárias
    // do componente. O React, por exemplo, pode ocorrer facilmente se mal implementado.
    const componentJaRenderizou =
      container?.querySelector(login.tagName?.toLowerCase()) !== null;
    if (componentJaRenderizou) {
      return login;
    }
    container!.appendChild(login);
    changeComponentToFullScreen(login);
    return login;
  }
}

/**
 * Inicializa o SDK e retorna um objeto a ser usado para realizar as operações
 * da lib: renderizações e métodos utilitários.
 */
export function init(config: ConfigMfaSdk): MfaSdk {
  const sdk = new _ImplMfaSdk();
  sdk.environment = config.environment;
  sdk.clientToken = config.clientToken;
  sdk.themeConfig = config.themeConfig;

  return sdk;
}
