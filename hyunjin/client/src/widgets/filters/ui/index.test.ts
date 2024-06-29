import { State } from "@shared/types"; // State 타입을 임포트합니다.
import Filters from "../ui";
import { getTodos } from "@shared/utils";

describe("Filters", () => {
  it('currentFilter를 기반으로 "선택된" 필터가 올바르게 적용 되었는지.', () => {
    // 테스트 대상인 currentFilter 상태를 설정합니다.
    const state: State = {
      todos: getTodos(),
      currentFilter: "Active",
    };

    // DOM 요소를 생성하고, 필터 리스트 항목을 시뮬레이션하기 위해 클래스와 텍스트 콘텐츠를 추가합니다.
    const targetElement = document.createElement("div");
    targetElement.innerHTML = `
      <div class="filter-list">All</div>
      <div class="filter-list">Active</div>
      <div class="filter-list">Completed</div>
    `;

    // Filters 함수를 호출하고 결과를 받습니다.
    const result = Filters(targetElement, state);

    // 결과로 받은 요소 내에서 "selected" 클래스를 가진 항목을 찾습니다.
    const selectedItems = result.querySelectorAll(".filter-list.selected");

    // "selected" 클래스가 올바르게 적용되었는지 검증합니다.
    expect(selectedItems.length).toBe(1); // "selected" 클래스를 가진 항목이 하나만 있는지 확인합니다.
    expect(selectedItems[0].textContent).toBe(state.currentFilter); // 해당 항목의 텍스트 콘텐츠가 currentFilter와 일치하는지 확인합니다.
  });
});
