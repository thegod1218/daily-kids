# DailyKids

아이 생활 데이터 기반 가족 플랫폼

## 기술 스택

- React 18 + Vite 5
- React Router v6 (라우팅)
- Zustand (전역 상태 + localStorage 영속)
- Supabase Auth (이메일 OTP 인증)
- PWA (오프라인 지원)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local.example`을 `.env.local`로 복사하고 Supabase 키를 입력해주세요.

```bash
cp .env.local.example .env.local
```

Supabase 키는 https://app.supabase.com → 프로젝트 → Settings → API 에서 확인할 수 있어요.

### 3. Supabase 설정

Supabase 대시보드에서 Email OTP 인증을 활성화해주세요:
- Authentication → Providers → Email → Enable Email OTP

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 빌드

```bash
npm run build
```

## Vercel 배포

1. GitHub에 푸시
2. Vercel에서 New Project 선택
3. Framework Preset: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 추가

## 구현된 기능 (1주차 인프라)

- [x] React Router v6 라우팅 구조
- [x] Supabase Auth 이메일 OTP 인증
- [x] 세션 유지 (자동 로그인)
- [x] PIN 잠금 (부모 화면 전환)
- [x] Zustand localStorage 영속성
- [x] 날짜별 미션 자동 초기화
- [x] 아이 홈 (레벨, XP, 출석, 감정, 저금통)
- [x] 미션 센터 (완료, 승인 요청, 추가)
- [x] 용돈 기입장 + 저금통
- [x] 부모 대시보드 (리포트, 승인, 쇼핑 연동)
- [x] GPS 안심 알림 UI
- [x] 설정 페이지
- [x] PWA 지원

## 다음 개발 예정 (2주차~)

- [ ] 독서 통장 + 독후감 검수
- [ ] 커뮤니티
- [ ] Supabase DB 연동 (실시간 동기화)
- [ ] 감정 리포트 차트 (recharts)
- [ ] 푸시 알림
- [ ] Google Play / App Store 출시

## 폴더 구조

```
src/
├── lib/
│   └── supabase.js       # Supabase 클라이언트
├── store/
│   └── index.js          # Zustand 전역 상태
├── hooks/
│   ├── useAuth.js         # 인증 훅
│   └── useToast.js        # 토스트 알림 훅
├── components/
│   ├── Common.jsx         # 공통 컴포넌트
│   └── TabBar.jsx         # 바텀 네비게이션
├── pages/
│   ├── LoginPage.jsx
│   ├── OtpPage.jsx
│   ├── SetupPage.jsx
│   ├── PinPage.jsx
│   ├── child/
│   │   ├── HomePage.jsx
│   │   ├── MissionsPage.jsx
│   │   └── MoneyPage.jsx
│   └── parent/
│       ├── DashboardPage.jsx
│       └── GpsSettingsPage.jsx
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```
