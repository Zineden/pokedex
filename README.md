# 포켓몬 포켓덱스 웹사이트

## 설명 동영상

아래 링크로 한국어 자막이 있는 영어 설명 영상을 보실 수 있습니다:

[포켓몬 사이트 설명 동영상](https://photos.app.goo.gl/jYSHRBQY8a42eBEj7)

## 소개
제 웹사이트는 항상 저를 매료시켰던 포켓몬 세계에서 영감을 받았습니다. 포켓몬 API를 발견한 후, 포켓덱스와 유사한 사이트를 만들기로 결정했습니다. 아래는 제 웹사이트의 스크린샷입니다.

<img width="1440" alt="Screenshot 2024-06-11 at 23 21 43" src="https://github.com/Zineden/pokedex/assets/83392181/daab4f08-b5a7-4215-83ab-4357d3b1274f">

## 포켓몬 카드
제 웹사이트에서 가장 중요한 부분은 포켓몬 카드입니다. 처음에는 HTML 파일에 포켓몬 카드가 없고, 카드용 컨테이너만 있습니다. 카드 데이터가 가져와진 후, 새 div가 JavaScript를 통해 생성되고 `innerHTML`과 `appendChild`를 사용하여 HTML에 추가됩니다.

### 카드 디자인
이것은 이상해씨 카드입니다. 카드의 `<div>` 태그는 "이상해씨"라는 이름, "001번"이라는 포켓덱스 번호, "풀/독" 타입과 같은 데이터를 포함합니다. 반투명한 포켓볼 이미지가 배경으로 사용되며, 카드의 색상은 포켓몬의 타입에 맞춰져 있습니다. 배경색을 위해 JavaScript에서 hex 값을 RGBA로 변환하여 선형 그라디언트를 사용했습니다. 포켓몬 컬렉션 카드에서 영감을 받아 `::before`, `::after`, `:hover` 가상 클래스를 사용하여 겹쳐진 배경과 빛나는 효과를 만들었습니다. 또한, 카드는 호버 시 튀어오르는 인터랙티브한 효과를 가집니다.

<div align="center"><img width="500" alt="Screenshot 2024-06-11 at 23 22 03" src="https://github.com/Zineden/pokedex/assets/83392181/fefec255-dd5d-4883-b77c-a47ddc581ade"></div>

## 팝업 창
카드를 클릭하면 추가 정보를 포함한 팝업 창이 나타납니다. `onclick` 속성을 통해 호출된 `displayPopup()` 함수는 팝업용 HTML 요소를 생성합니다. 데이터는 여러 API 요청을 피하기 위해 캐시됩니다. 팝업은 오버레이 디스플레이 속성을 변경하여 백그라운드 클릭을 제한합니다. 팝업 내 탭은 CSS 가상 클래스를 사용하여 다양한 콘텐츠 섹션을 전환합니다.

<img width="1440" alt="Screenshot 2024-06-11 at 23 22 24" src="https://github.com/Zineden/pokedex/assets/83392181/f2f1c29b-841a-4f23-8381-ab206c3b3640">

### 팝업 콘텐츠
첫 번째 탭에는 포켓몬 설명, 체격, 그리고 번식 정보가 포함됩니다. 설명은 다른 URL에서 가져와 올바른 언어로 필터링됩니다. 키와 몸무게는 미터법에서 임페리얼 단위로 변환됩니다. 번식 세부 정보에는 성별 아이콘, 알 그룹, 부화 기간, 능력 등이 포함되며, 정렬을 위해 특수 문자를 사용하여 형식화됩니다.

두 번째 탭은 기본 통계를 표시합니다. 진행 표시줄은 선형 그라디언트를 사용하여 통계 비율을 표시하며, 포켓몬 색상이 통계를 나타냅니다.

세 번째 탭은 포켓몬 기술을 나열하며, 호버 시 색상이 변경됩니다. 기술을 클릭하면 기술의 세부 정보(파워, 정확도, PP, 타입 등)가 표시됩니다.

## 검색 기능
검색 기능은 특정 포켓몬을 찾는 데 도움을 줍니다. 키업 이벤트가 발생할 때 활성화되어 일치하는 포켓몬 이름을 표시합니다. 검색 바에는 반짝임과 광택 애니메이션, 달리는 피카츄 GIF, 반투명 포켓볼 이미지, 그리고 구글 검색 아이콘이 포함된 둥근 디자인이 포함됩니다. 향후 개선 사항에는 더 유연한 검색 기준과 오류 허용이 포함될 것입니다.

<img width="1440" alt="Screenshot 2024-06-11 at 23 25 53" src="https://github.com/Zineden/pokedex/assets/83392181/1a2a7258-c842-4ed0-8752-d2f42dcad94d">

## GIF 검색
페이지 오른쪽의 GIF 검색 기능은 GIPHY API에서 데이터를 가져옵니다. 버튼을 클릭하면 팝업이 열리며 포켓몬 관련 GIF가 표시됩니다. 검색은 ajax를 사용하며, 결과는 30개의 GIF로 제한됩니다. 컨테이너는 스크롤이 가능합니다.

<img width="1276" alt="Screenshot 2024-06-11 at 23 28 23" src="https://github.com/Zineden/pokedex/assets/83392181/5107b372-e7d6-4b1a-876f-fa27f66bd8fc">


