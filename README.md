# label-memo-app

라벨을 이용해 메모를 관리하는 서비스입니다.

[디자인(Figma)](https://www.figma.com/file/Mv3lEV0Y59PsnzfU2CKv5aYz/memoApp?node-id=17%3A64)

[Live Demo](https://label-memo-app.firebaseapp.com/)

## 프로젝트 실행 방법
```
# Project setup
yarn install

# Run dev server
yarn run serve

# Build for production
yarn run build
```

## 사용한 기술들
- Vue
  - Vuex (State Management)
  - vue-router
- Firebase
  - Firestore (DB)
  - Hosting
- Preprocessor
  - Pug (HTML)
  - Sass (CSS)
- Other libraries
  - js-cookie (Save credential on cookies)

## 설계

### 디자인

일반적인 메모 앱이지만, 한 메모가 여러 가지의 라벨을 가질 수 있고, 라벨 또만 여러 개의 메모를 가질 수 있다는 특이점이 있습니다.

사실 처음 기획안을 보았을 때에 들었던 생각은, 한 화면 안에 많은 편집 버튼이 있으며, 각각의 편집 버튼이 다른 역할을 수행해서 유저가 불편할 수 있겠다는 생각이 들었습니다.

그래서 각각의 구역들(라벨, 메모, 메모 상세)마다 편집 버튼을 만들어서 한 번에 한 구역만 편집할 수 있게 디자인을 했습니다. (개발은 진행 중입니다.)

또한, 라벨과 메모를 확실히 구분할 수 있게 라벨에 임팩트를 주었습니다.

주어진 기획안에 어떤 유저들이 사용할 것이라는 정보가 빠져있고, 메모 앱은 정말 다양한 목적으로 사용할 수 있어 확실한 페르소나를 잡기 어려웠습니다. 그래서 최대한 범용성이 있게 디자인했고, 기획안에 있던 골격을 많이 따라갔습니다.

### 개발 환경 설정

SPA 서비스를 개발해야 되었기 때문에, Angular/React/Vue 중 하나의 프레임워크와 서버 프레임워크를 선택해야 했습니다. 웹 프론트엔드 쪽은 경험이 많고 개발이 빠른 Vue를 선택했으며, 서버는 서버 개발 경험이 많지 않고 SPA 서비스이기 때문에 Firebase를 사용했습니다. (그러나 DB 명세와 구조가 이전과 달라져 생각보다 시간이 더 오래 걸렸습니다.)

### 중요 개발 이슈들

개발은 마크업 -> 서버 없이 동작 구현 -> 서버와 통신하면서 동작 구현 의 순서로 진행했으며, 개발 도중에 중요하게 생각했던 부분들을 정리하겠습니다.

#### 1. 반응형 디자인

#### 2. 삭제 기능과 DB 설계

#### 3. 편집 기능

#### 4. 라벨/메모 선택과 routing


## TODO
- Show timestamp of memos
- Filter the memos with a label
- Edit label name
- Change the labels of the memos
- Delete feature + revise the DB structure
- Errors in login page
- Add routing when selecting labels or memos
- Design Issues
- Prevent unexpected actions while editing
- Reponsive Web (Mobile page)
- Cross Browser
- Error Catching
- Unit Test

And Fix Issues...