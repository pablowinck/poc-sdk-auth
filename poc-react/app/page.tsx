"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    import("poc-sdk-auth").then((module) => {
      const sdk = module.init({
        environment: "DEV",
        clientToken: "token",
        themeConfig: {
          theme: "light",
          assets: {
            logo: "https://nextjs.org/icons/next.svg",
          },
        },
      });

      const component = sdk.renderAutenticacao();
      component.on("erro", () => {
        console.log("Erro ao logar");
      });
    });
  }, []);

  return (
    <div className={styles.page}>
      <div id="aegis-autenticacao"></div>
    </div>
  );
}
