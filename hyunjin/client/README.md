## TODO 만들기

#### [예시 사이트](https://todomvc.com/examples/javascript-es6/dist/#/)

- [x] 헤더 퍼블
      ![Header](/screenshots/header.png)

---

- [x] 풋터 퍼블
      ![Footer](/screenshots/footer.png)

---

- [x] 인풋 퍼블

  - [x] placeholder는 "What needs to be done?"
        ![Input](/screenshots/no_item.png)
  - [x] todo list가 0보다 크면 좌측 전체 선택 화살표 visible (회색)
        ![Input](/screenshots/have_item.png)
  - [x] todo item이 모두 선택 되어 있으면 좌측 전체 선택 화살표 검색으로 변경
        ![Input](/screenshots/checked_item.png)
  - [x] todo item이 일부만 선택 되어 있거나 아무것도 선택 되어 있지 않으면 전체 선택 화살표는 회색으로 변경
        ![Input](/screenshots/once_checked_item.png)

---

- [x] 인풋 기능

  - [x] 인풋에 값 입력 후 enter 시 입력된 값 리스트에 출력
  - [x] todo item이 일부만 선택 되어 있거나 아무것도 선택 되어 있지 않을 때 좌측 전체 선택 화살표 클릭 시 todo list 전체 선택
  - [x] todo item이 전체 선택 되어 있을 때 좌측 전체 선택 화살표 클릭 시 todo list 전체 선택 해제

---

- [x] todo 리스트 퍼블

  - [x] todo item 마우스 호버 시 오른 x 버튼 visible 처리
        ![Input-Hover](/screenshots/hover_item.png)
  - [x] 리스트에 있는 todo item의 왼쪽 체크 박스 클릭 시 middle line 생기면서 비활성화
  - [] item 더블 클릭 시 input 활성화
    ![Input-Double-Click](/screenshots/double_click_item.png)

---

- [x] todo 리스트 기능

  - [x] 리스트에 있는 todo item의 왼쪽 체크 박스 클릭 시 비활성화
  - [] 리스트에 있는 todo item 더블 클릭 시 수정 기능
  - [x] todo item 'x' 버튼 클릭 시 리스트의 해당 item 제거

---

- [x] todo 리스트 풋터 퍼블
      ![Input-Double-Click](/screenshots/double_click_item.png)
  - [x] 남은 todo 개수를 표현하는 `item left`
  - [x] `All`, `Active`, `Completed` router 버튼
  - [x] 체크된 아이템이 있을 때 `Clear completed` 버튼 visible

---

- [x] todo 리스트 풋터 기능
  - [x] `All` 버튼 클릭 시 `/#/`경로로 이동되고 전체 todo list 출력
  - [x] `Active` 버튼 클릭 시 `/#/active`경로로 이동되고 완료가 안된 todo item 출력
  - [x] `Completed` 버튼 클릭 시 `/#/completed` 경로로 이동되고 완료된 todo item 출력
  - [x] `Clear completed` 버튼 클릭 시 체크된 todo item 제거
