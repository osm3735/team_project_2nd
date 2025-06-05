## 1. 조 소개
#### 1} 조 이름
- 불협화음
#### 2} 조 구호
- 다양성은 갈등이 아니라 성장의 씨앗이다.
#### 3} 구성원
+ 오상민 (조장) 
    - FastAPI Web Server, Map API 연동, 이미지 슬라이더, 이미지 Selector 구현    
+ 이정민 (조원) 
    - HTML 웹 페이지 구현, 링크 수정.
+ 황대훈 (조원) 
    - CSS, 주요 스타일링 구현
---
## 2. 프로젝트 소개
#### 카페 프로젝트 + 맵
이전에 진행했던 ‘자바칩 카푸치노’ 프로젝트를 확장하여, 가상의 커피 전문 매장 홈페이지를 구현하였습니다. 이번 프로젝트에서는 단순한 정보 제공을 넘어, 지도 기능을 연동하여 매장 위치를 시각적으로 확인할 수 있도록 하였으며, 주문 및 배송 기능을 프론트엔드 측면에서 구현하였습니다.

또한, 사용자의 상호작용에 따라 실시간으로 데이터가 처리될 수 있도록 비동기 방식의 데이터 통신이 가능한 백엔드 서버를 구축하였고, FastAPI 기반의 API 서버를 통해 원활한 프론트엔드-백엔드 연동을 실현하였습니다.

- Web - view
	HTML, CSS,  태그에 대한 정의 및 구현 
	
- Google Map API
	Google Maps API와 연동. Javascript, json.

- FastAPI + Python + Poetry + AWS   
    AWS Ubuntu 에서 poetry 가상환경을 구축하고   
    FastAPI를 통해 Web Page를 보여주도록 처리.

---
## 3. 프로젝트 구조.
```
project/
├ README.md
├ index.html
├ app/        # main.py
├ template/
│  └ *.html
└ static/    # 정적 파일
   ├ css/
   ├ js/
   ├ img/
   └ json/
```
