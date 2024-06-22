let panel;
let start;
let frames = 0;

const create = () => {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(`
      .fps {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 50px;
        height: 50px;
        background-color: black;
        color: white;
      }`)
  );
  document.getElementsByTagName("head")[0].appendChild(style);

  const div = document.createElement("div");
  div.classList.add("fps");
  return div;
};

const tick = () => {
  frames++;
  const now = window.performance.now();
  // 1초마다 fps 업데이트
  if (now >= start + 1000) {
    panel.innerText = frames;
    frames = 0;
    start = now;
  }
  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();

  // 시작
  window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
  });
};

export default {
  init,
};
