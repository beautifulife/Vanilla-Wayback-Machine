# 5기 최종 테스트


## 프로젝트 설명

- 웹 아카이브 머신을 구현 하였습니다.
- boilerplate로 vanilla-blog를 사용하였고, 사용한 기술스택은 다음과 같습니다.
  - React
  - React-router
  - Redux
  - Node
  - Express
  - MongoDB (mlab, Mongoose)
- [archive.org](https://archive.org) 와 기본적인 UX가 유사하도록 구현하였습니다. (사용방법, url 변경 등)

## 프로젝트 Set up

1. `git clone`
2. `yarn install ` or `npm install`
3. `yarn dev` or `npm run dev`

## vanilla_archive 사용방법

- http://localhost:3000/ 으로 접속합니다.
- 메인화면 가운데 검색창에 url 을 입력합니다. ([http|https]:// 필요)  잘못된 url 을 입력 시 검색이 되지 않습니다.
- 검색을 실행하면 해당 url의 archive 여부를 검사하고, 데이터가 존재 시 archive 날짜가 표시된 달력을 출력합니다.
  - 데이터가 있는 경우: 달력에 표시된 날짜를 클릭하면 해당 일자에 존재하는 archive들을 세부 시간 별로 표시합니다. 해당 시간을 클릭하면 archive를 표시하는 화면으로 이동하고, 화면에 저장된 페이지가 출력됩니다.
  - 데이터가 없는 경우: 데이터가 없는 경우 2가지로 구분합니다.
    1. url이 없는 경우: 없는 페이지라는 메시지가 출력됩니다.
    2. url이 있는 경우: 페이지를 새로이 등록할 수 있도록 하는 메시지가 출력됩니다. register 버튼을 클릭하면 DB에 해당 url이 구독되고, 3초 뒤 해당 페이지를 archive한 화면으로 자동전환 됩니다.
- 페이지가 출력된 화면에서 상단에 보이는 controllers 버튼으로 마우스를 가져가면 컨트롤러가 활성화 됩니다. 컨트롤러를 통해 만약 이전, 이후 시점의 데이터가 존재한다면 화살표를 클릭하여 해당 시점으로 이동할 수 있습니다.
- 모든 페이지에서 상단의 로고를 클릭하면 메인페이지로 전환됩니다.
- registered archive들은 매주 월요일 10시에 스크랩핑하도록 스케쥴링 하였습니다.

***

# 감사합니다 !oo!
