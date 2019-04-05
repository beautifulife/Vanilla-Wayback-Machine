# Vanilla-Wayback-Machine

웹 사이트를 아카이빙하는 웨이백 머신을 만드는 과제

![waybackMachine](vanilla_archive.gif)


## Setup

```sh
yarn install 
# or npm install
```

## Development

```sh
yarn dev
# or npm run dev
```

## Features

- 웹 아카이브 머신을 구현
- CRA 사용
  - React
  - React-router
  - Redux
  - Node
  - Express
  - MongoDB (mlab, Mongoose)
- [archive.org](https://archive.org) 와 기본적인 UX가 유사하도록 구현 (사용방법, url 변경 등)

## How to use

- http://localhost:3000/ 으로 접속
- 메인화면 가운데 검색창에 url 을 입력 ([http|https]:// 필요)  잘못된 url 을 입력 시 검색 불가
- 검색을 실행하면 해당 url의 archive 여부를 검사하고, 데이터가 존재 시 archive 날짜가 표시된 달력을 출력
  - 데이터가 있는 경우: 달력에 표시된 날짜를 클릭하면 해당 일자에 존재하는 archive들을 세부 시간 별로 표시. 해당 시간을 클릭하면 archive를 표시하는 화면으로 이동하고, 화면에 저장된 페이지 출력
  - 데이터가 없는 경우: 데이터가 없는 경우 2가지로 구분
    1. url이 없는 경우: 없는 페이지라는 메시지 출력
    2. url이 있는 경우: 페이지를 새로이 등록할 수 있도록 하는 메시지 출력. register 버튼을 클릭하면 DB에 해당 url이 구독되고, 3초 뒤 해당 페이지를 archive한 화면으로 자동전환
- 페이지가 출력된 화면에서 상단에 보이는 controllers 버튼으로 마우스를 가져가면 컨트롤러 활성화. 컨트롤러를 통해 만약 이전, 이후 시점의 데이터가 존재한다면 화살표를 클릭하여 해당 시점으로 이동
- 모든 페이지에서 상단의 로고를 클릭하면 메인페이지로 전환
- registered archive들은 매주 월요일 10시에 스크랩핑하도록 스케쥴링
