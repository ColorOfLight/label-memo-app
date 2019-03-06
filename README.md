# label-memo-app

라벨을 이용해 메모를 관리하는 서비스입니다.

[디자인(Figma)](https://www.figma.com/file/Mv3lEV0Y59PsnzfU2CKv5aYz/memoApp?node-id=17%3A64)

[Live Demo](https://label-memo-app.firebaseapp.com/)

## 프로젝트 실행 방법
1. `git clone https://github.com/ColorOfLight/label-memo-app.git`
2. Set up your Firebase console
3. Set active Auth via Email/Password & Firestore(Database)
4. Create `config.json` at the root path with following form:

```
{
  "apiKey": {YOUR_API_KEY},
  "authDomain": {YOUR_AUTH_DOMAIN},
  "projectId": {YOUR_PROJECT_ID}
}
```

5. Install packages & Run dev server!

```
# Project setup
yarn install

# Run dev server
yarn run serve

## Just for distribution!

# Build for production
yarn run build
```

## 사용한 기술들
- Vue
  - Vuex (State Management)
  - vue-router
- Firebase
  - Firestore (DB)
  - Authentication
  - Hosting
- Preprocessor
  - Pug (HTML)
  - Sass (CSS)
- Other libraries
  - js-cookie (Save credentials on cookies)

## 설계

### 디자인

일반적인 메모 앱이지만, 한 메모가 여러 가지의 라벨을 가질 수 있고, 라벨 또만 여러 개의 메모를 포함할 수 있다는 특징이 있습니다.

사실 처음 기획안을 보았을 때에 들었던 생각은, 한 화면 안에 많은 편집 버튼이 있으며, 각각의 편집 버튼이 다른 역할을 수행해서 유저가 불편할 수 있겠다는 생각이 들었습니다.

그래서 각각의 구역들(라벨, 메모, 메모 상세)마다 편집 버튼을 만들어서 한 번에 한 구역만 편집할 수 있게 디자인을 했습니다. (개발은 진행 중입니다.)

또한, 라벨과 메모를 확실히 구분할 수 있게 라벨에 임팩트를 주었습니다.

주어진 기획안에 어떤 유저들이 사용할 것이라는 정보가 빠져있고, 메모 앱은 정말 다양한 목적으로 사용할 수 있어 확실한 페르소나를 잡기 어려웠습니다. 그래서 최대한 범용성이 있게 디자인했고, 기획안에 있던 골격을 많이 따라갔습니다.

### 개발 환경 설정

SPA 서비스를 개발해야 되었기 때문에, Angular/React/Vue 중 하나의 프레임워크와 서버 프레임워크를 선택해야 했습니다. 웹 프론트엔드 쪽은 경험이 많고 개발이 빠른 Vue를 선택했으며, 서버는 서버 개발 경험이 많지 않고 SPA 서비스이기 때문에 Firebase를 사용했습니다. (그러나 DB 명세와 구조가 이전과 달라져 생각보다 시간이 더 오래 걸렸습니다.)

### 중요 개발 이슈 및 추가 개발 진행 계획

개발은 마크업 -> 서버 없이 동작 구현 -> 서버와 통신하면서 동작 구현 의 순서로 진행했으며, 개발 도중에 중요하게 생각했던 부분들을 정리하겠습니다.

#### 1. 반응형 디자인

데스크탑 화면을 기준으로 디자인을 할 경우, 모바일 화면에 맞지 않는 경우가 많아 모바일 화면을 먼저 디자인한 후 최대한 컴포넌트를 재사용할 수 있게 데스크탑 화면을 디자인했습니다.

실제로 데스크탑의 화면은 모바일의 각 뷰를 수평으로 나열해 놓은 것이기 때문에, 아직 모바일 화면이 구현이 안 되었지만 구현 시 디자인을 컴포넌트의 큰 변경없이 쉽게 구현할 수 있을 것입니다.

#### 2. 삭제 기능과 DB 설계

이번 프로젝트에서 다루는 데이터는 라벨과 메모가 m-to-n 대응을 하는 구조입니다. 즉, transaction error를 최소화하기 위해서는 라벨과 메모 데이터 사이에 matching table을 두는 등의 조치를 취했어야 했지만, 백엔드 개발 경험이 부족해 처음부터 이 부분을 고려하지는 못했습니다.

그래서 추후에 DB 설계를 일부 수정해 삭제 기능을 구현할 수 있게 변경할 예정입니다.

#### 3. 편집 기능

이번 프로젝트에는 총 3가지 섹션에 편집 기능이 들어갑니다. 모바일 뷰에서는 이 점이 큰 문제가 되지 않지만, 데스크탑 화면의 경우, 한 번에 여러 섹션의 편집 기능을 활성화하는 경우가 발생할 수 있습니다. 이때에 삭제된 라벨의 메모를 조회하는 등 다양한 예외 상황이 발생할 수 있습니다.

그래서 이를 막고자 한 섹션의 편집 부분이 활성화될 경우, 다른 섹션을 비활성화 처리를 할 예정이었고, 디자인도 완료했으나 구현을 아직 하지 못했습니다. 추후에 이 부분이 개발되면 위에서 말했던 문제점들을 해결할 수 있을 것입니다.

#### 4. 라벨/메모 선택과 routing

이번 기획서의 명세 중에 라벨이나 메모를 선택한 후 뒤로 가기 버튼을 누르면 이전 화면으로 돌아가는 것이 있었습니다. 이를 구현하기 가장 쉬운 방법 중 하나는 routing, 즉, url을 이용하는 것입니다.

- 라벨: `/labels/{LABEL_KEY}` or `/`
- 메모: `/labels/{LABEL_KEY}/memos/{MEMO_KEY}` or `/memos/{MEMO_KEY}`

위와 같이 route를 구성하면, 중복 없이 모든 화면을 나타낼 수 있을 것입니다. 또한, 이번 프로젝트에서는 vue-router를 사용하기 때문에 router의 변화한 값을 보고 화면을 바꾸는 방식을 이용해 구현할 수 있을 것입니다.

## TODO
- Show timestamp of memos
- Add loading screen when loads data from firestore
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