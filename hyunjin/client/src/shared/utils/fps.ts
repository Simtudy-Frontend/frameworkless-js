function fps() {
  let panel: HTMLDivElement | null = null;
  let start: number | null = null;
  let frames: number = 0;

  function create(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement("div");

    div.style.position = "fixed";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.backgroundColor = "black";
    div.style.color = "white";

    return div;
  }

  function resetFramesAndStart(now: number): void {
    if (panel !== null) {
      panel.innerText = frames.toString();
    }
    frames = 0;
    start = now;
  }

  function tick(): void {
    frames++;
    const now: number = window.performance.now();
    if (start !== null && now >= start + 1000) {
      resetFramesAndStart(now);
    }
    window.requestAnimationFrame(tick);
  }

  function initializePanel(parent: HTMLElement): void {
    panel = create();
    if (panel !== null) {
      parent.appendChild(panel);
    }
  }

  function init(parent: HTMLElement = document.body): void {
    initializePanel(parent);

    window.requestAnimationFrame(() => {
      start = window.performance.now();
      tick();
    });
  }

  return init();
}

export default fps;
