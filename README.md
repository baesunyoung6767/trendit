# 트렌딧 (Trendit)

매일 패션·음식 트렌드를 가볍게 읽는 모바일 PWA 프로젝트. 현재 메인·상세 **2개 화면이 목업으로 구현**되어 있고, 실제 데이터 조회·구독·푸시는 연결 전이다.

현재 기준: 2026-10-18 / Day 11. Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS v4, 나눔스퀘어라운드 웹폰트.

## 실행과 확인

```bash
npm ci
npm run dev
```

`code/`에서 실행한 뒤 [localhost:3000](http://localhost:3000)을 연다. 상세 예시는 `/trend/mock-trend-01`. 없는 ID에는 안내 화면을 표시한다.

```bash
npm run lint
npm run build
npm run start
```

개발 중에는 [AGENTS.md](./AGENTS.md)에 따라 설치된 Next.js 문서를 확인한다. 환경변수는 `.env.local`에서 관리하고 저장소에 포함하지 않는다.

## 현재 구현

- 흰색 56px 메뉴바와 309px 옐로 히어로, 새 메인 캐릭터. 목록 배경 `#FFFCF5`, 포인트 `#F2C94C`, 차콜 `#252522`.
- 작은 날짜 버튼에서 월간 달력 열기, 연도·월·일 선택, 미래 날짜 제한, 오늘 복귀. 주간 선택 영역은 제거했다.
- 카테고리 복수 선택 및 재클릭 해제. 모든 카테고리 선택/해제 또는 ‘전체’ 클릭 시 전체 목록 표시. 검색어와 카테고리 필터를 함께 적용한다.
- 테스트용 ‘경제’는 목업과 타입에만 추가했다. 경제 콘텐츠·DB 시드·운영 수집은 추가하지 않았으며 운영 반영 전 유지 여부를 결정한다.
- 상세 본문·외부 링크·연관 검색, 메인/상세 좋아요 상태 공유. 좋아요는 메모리 상태라 새로고침 시 초기화된다.
- 상세 요청마다 캐릭터 3종 중 하나를 서버에서 랜덤 선택한다. `connection()` 이후 `randomInt(3)` 사용. 같은 이미지가 연속 나올 수 있고 화면 재사용/하트 조작마다 다시 추첨하는 방식은 아니다.
- 상세 본문→추천→연관 검색어 사이 간격 각각 48px. 실제 이미지 URL이 없으면 회색 플레이스홀더.

## 데이터와 이미지

- `lib/data.ts`: `getTodayTrends()`, `getCategories()`, `getTrendById(id)`를 통해 화면 데이터를 조회하며 현재는 목업을 반환한다.
- `lib/mock-data.ts`: 음식·패션 트렌드 6개, 일일 소개, 외부 링크, 연관 검색어, 테스트용 경제 카테고리.
- `lib/types.ts`: 현재 `CatCode`는 `food | fashion | economy`. 경제는 테스트 목적이다.
- `public/character-v2.png`: 메인과 없는 ID 안내 화면 캐릭터.
- `public/characters/detail_01.png` ~ `detail_03.png`: 상세 랜덤 캐릭터.
- `public/character.png`: 이전 여우 이미지 보관용. 현재 화면에서는 사용하지 않는다.

날짜 선택은 아직 데이터 조회와 연결되지 않아 선택 날짜를 바꿔도 같은 목업이 보인다. 실제 이미지 로딩 실패 시 대체 처리, DB 좋아요, 미구독 안내, 온보딩·설정·즐겨찾기, PWA/푸시·수집 자동화는 후속 작업이다.

## 로컬 문서

Git 저장소는 `code/`만 관리한다. 아래 파일은 상위 작업 폴더에 있는 로컬 산출물이며 코드 커밋에 포함되지 않는다.

- [진행 대시보드](../docs/progress_dashboard.html)
- [Day 11 작업 기록](../daily/day11.md)
- [화면 설계와 현재 디자인 토큰](../design/wireframes.md)
- [제품 기획](../docs/PRD.md) · [아키텍처](../docs/tech_architecture.md) · [API 명세](../docs/api_spec.md)

마지막 커밋은 `c2a0053`. Day 11 변경은 아직 커밋·푸시하지 않았으며 최신 배포 반영 여부는 확인 전이다.
