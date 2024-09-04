// devemos atribuir estilizações para deixar o componente
// em full-screen, ficando em cima de qualquer outro conteúdo
export function changeComponentToFullScreen(component: HTMLElement): void {
  Object.assign(component.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "9999",
    backgroundColor: "var(--mfa-color-neutral-soft, rgba(0, 0, 0))", // fiquei em dúvida sobre o fundo, pois pode variar conforme o tema
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
}
