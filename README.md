# 집밥 꼬꼬선생

## 리팩토링
**이전에 진행했던 집밥 꼬꼬선생 프로젝트의 코드 품질에 아쉬움을 느껴 리팩토링을 진행하기로 하였습니다.**
- 리팩토링을 하며 겪었던 경험들은 wiki페이지에 정리해두었습니다. 
    - [wiki 페이지 바로가기 (링크)](https://github.com/jihohub/Refactoring-HomeCookingMaster/wiki)  
- 진행상황
    - Next.JS 도입  
        - SEO 개선  
        크롬 라이트하우스 SEO 점수 70 -> 91 지속적 개선 중  
        - 초기 렌더링속도 개선  
        크롬 라이트하우스 First Contentful Paint 2.0s -> 0.3s  
        Largest Contentful Paint 4.1s -> 3.1s, Speed Index 2.0s -> 0.7s
        - 각 페이지의 성격별로 적절한 SSR, SSG 적용  
    - React-Query 도입  
        - 비동기통신을 위해 비대해진 Redux-toolkit에서 탈피  
        - 전역상태관리에서 비동기통신 분리  
        - 적절한 Caching과 Refetching으로 최신 데이터 유지  
    - Recoil 도입  
        - 기존 프로젝트에 도입했었던 Redux-toolkit에 비해 적은 보일러플레이트  
        - 추후 전역관리할 상태 추가시 적은 코드만 추가 가능  
    - SASS with CSS Module 적용  
        - CSS-in-JS에 비해 렌더링 속도가 빠른 CSS-in-CSS 적용  
        - FOUC (Flash of unstyled content) 방지  
        - CSS Module을 통해 CSS 클래스 중첩 방지  
    - MISC  
         - 웹팩, 바벨 설정  
         - 미흡했던 반응형 디자인 강화    
- 계획
    - 웹팩과 바벨 설정
    - 코딩 인벤션 : Airbnb 스타일 가이드
    - NextJS 도입 : SEO의 개선을 통해 검색엔진에서 집밥 꼬꼬선생의 레시피가 상위에 노출될 수 있도록 하고 초기 렌더링 속도를 개선할 것입니다.
    - react-query 도입 : redux-toolkit의 무거움으로 인해 상태관리 라이브러리를 react-query로 변경할 것입니다.
    - next-auth 도입 : 자체 로그인과 소셜 로그인을 간편하게 구현할 수 있는 next-auth 라이브러리를 도입할 것입니다. (도입하였으나 제거)
    - SASS 도입 : 기존 프로젝트에서는 CSS에 대한 규칙을 정립하지 않고 CSS-in-CSS와 CSS-in-JS (styled-components), MUI 인라인 처리 등 CSS가 중구난방으로 혼용되어 있습니다. 이를 CSS-in-CSS로 통일할 것입니다. CSS-in-CSS가 CSS-in-JS보다 렌더링속도가 빨라서 SSR을 도입하는 취지와도 일맥상통하다고 느꼈습니다.
    - 반응형 디자인 강화 : 기존 프로젝트에서는 웹에 맞추어 디자인을 하고 미디어쿼리를 이용해 모바일에서 다른 화면을 보여주게끔 단순하게 처리를 하였는데 리팩토링을 통해 처음부터 웹과 모바일을 동시에 고려해 디자인부터 다시 할 계획입니다.


----
**AI 이미지 처리 기능을 활용해 이미지로 집밥 레시피를 검색할 수 있는 서비스**

- **타겟층** : 2-30대 사회 초년생, 레시피가 필요한 초보 요리사
- **문제 정의** : 누구나 휴대폰 앨범에 맛있어 보이는 음식 사진을 많이 가지고 있다. 하지만 요리에 도전해 보려니 음식 이름도, 레시피도 찾을 수 있는 방법이 없다.
- **목표 :**
    - **음식의 이미지를 업로드**하면 레시피를 보여 줌
    - 레시피를 활용하여 만든 음식을 다른 **사용자들과 함께 공유하는 커뮤니티**를 통해 이용의 흥미를 높임
    - 댓글을 단 레시피들과 저장한 레시피들을 보여주는 **마이 페이지를 구현**하여 활용도를 높임

## 프로젝트 구성 안내
## 1. 프로젝트 소개
  <p>매일 먹는 배달음식에 지친 사람들을 위한 집밥 레시피 사전 서비스</p>
  만들어 먹고 싶은 음식을 이미지로 검색하여 레시피를 찾아보세요!

## 2. 프로젝트 목표
  - **음식의 이미지를 업로드**하면 레시피를 보여 줌
  - 레시피를 활용하여 만든 음식을 다른 **사용자들과 함께 공유하는 커뮤니티**를 통해 이용의 흥미를 높임
  - 댓글을 단 레시피들과 저장한 레시피들을 보여주는 **마이 페이지를 구현**하여 활용도를 높임

## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**

- 주요 기능 (주된 활용성) 및 서브 기능
**메인 기능**
: 음식 사진 / 텍스트 레시피 검색 기능
  - 사용자가 업로드한 음식 사진을 분석하여 분석 결과 출력
  - 해당 음식에 대한 텍스트 레시피 보여줌 
  - 음식별 최대 5가지 레시피

**서브 기능**
  1. 랭킹페이지
    - 스크랩 수 및 조회수가 높은 레시피를 보여주는 기능
  2. 로그인 / 회원가입
    - 회원가입과 로그인 후에 레시피 스크랩 및 댓글 작성 가능
  3. 레시피별 댓글
    - 텍스트 댓글, 음식 사진 추가 첨부 기능
    - 댓글로 업로드한 음식 사진과 기존 음식 사진의 일치율을 보여줌
  4. 레시피 스크랩
    - 마음에 드는 레시피를 스크랩하여 쉽게 찾을 수 있는 기능
  5. 마이페이지
    - 회원정보 확인 및 수정 기능
    - 스크랩한 레시피 리스트 확인
    - 보인이 작성한 댓글 확인


- 프로젝트만의 차별점, 기대 효과
  - 레시피 정보 제공 뿐만 아니라 각 레시피별 댓글로 레시피에 대한 의견 공유 가능
  - 커뮤니티를 통해 이용의 흥미를 높이고 레시피에 대한 관심도 증가
  - 사진만으로 검색이 가능하여 요리 입문자들의 편의성 증대

## 4. 프로젝트 구성도
  - [와이어프레임(whimsical)](https://whimsical.com/BQKYbWTEBNSCXGogpa56Ld@3CRerdhrAw877Cy9njAQYa1y)

## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 김한별 | 백엔드 개발 |
| 김희재 | 백엔드 개발 |
| 나석균 | 백엔드 개발 및 인공지능 |
| 남경민 | 프론트엔드 개발 |
| 박지호 | 프론트엔드 개발 |
| 조승희 | 인공지능 |

<br/><br/>
[:book: More Information...](https://github.com/SeokKyunNa/HomeCookingMaster/wiki)
