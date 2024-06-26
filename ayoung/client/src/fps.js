/* NOTE: simple FPS widget
    requestAnimationFrame 콜백을 사용하여
    렌더링 사이클 간의 시간을 추적함.
    콜백이 1초 내에 호출되는 횟수를 추적하연 FPS 값이 나옴.

    (참고)
    https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
    https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C
*/

let panel;      /* 위젯 패널 요소 */
let start;      /* 시작 시간 */
let frames = 0; /* 프레임 카운트 */


const create = () => {
    const div = document.createElement('div');
    div.classList.add('fps');
    return div;
};


const tick = () => {
    frames++;
    const now = window.performance.now();
    if (now >= start + 1000) {
        /* 시작 이후 1초 이상 시간이 흘렀으면 fps 값을 출력하고 리셋함 */
        panel.innerText = frames;
        frames = 0;
        start = now;
    }
    window.requestAnimationFrame(tick);
};



const init = (parent = document.body) => {
    panel = create();

    window.requestAnimationFrame(() => {
        start = window.performance.now();
        parent.appendChild(panel);
        tick();
    });
};


export default {
    init
};