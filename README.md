# 티울영어 — 공식 웹사이트

성인 영어 전문 학원 **티울영어**의 단일 페이지(SPA) 웹사이트입니다.  
Python Flask + Jinja2 기반으로 제작되었으며, 수업 스케줄은 `schedule.json`만 수정해 쉽게 업데이트할 수 있습니다.

---

## 프로젝트 구조

```
tiul-academy/
├── app.py                  # Flask 애플리케이션 진입점
├── schedule.json           # 수업 데이터 (매월 이 파일만 수정)
├── templates/
│   └── index.html          # Jinja2 메인 템플릿
├── static/
│   ├── css/
│   │   └── style.css       # 전체 스타일시트
│   └── images/             # (직접 추가 필요)
│       ├── logo.png        # 학원 로고
│       └── director.jpg    # 원장 사진
└── README.md
```

---

## 시작하기

### 1. 요구 사항

- Python 3.8 이상
- pip

### 2. 의존성 설치

```bash
pip install flask
```

### 3. 개발 서버 실행

```bash
python app.py
```

브라우저에서 [http://localhost:5000](http://localhost:5000) 으로 접속합니다.

---

## 수업 스케줄 업데이트 방법

매월 **`schedule.json`** 파일만 수정하면 HTML을 건드리지 않아도 자동으로 반영됩니다.

### schedule.json 구조

```json
{
  "month": "2026년 4월",
  "levels": [
    {
      "name": "기초 회화",
      "description": "과정 한 줄 소개",
      "target": "이런 분께 적합합니다",
      "feature": "수업의 특징"
    }
  ],
  "timetable": [
    {
      "name": "기초 회화",
      "days": "월 / 수",
      "time": "10:00 – 10:50"
    }
  ]
}
```

| 필드 | 설명 |
|---|---|
| `month` | 페이지 상단에 표시되는 기준 월 |
| `levels[]` | 레벨 소개 카드 4개의 내용 |
| `timetable[]` | 주간 시간표 그리드에 표시되는 수업 목록 |

> ⚠️ 현재 시간표 그리드는 **월~목** 4개 열로 고정되어 있습니다.  
> 요일이나 시간대가 크게 변경될 경우 `index.html` 내 `slots` 변수도 함께 수정해야 합니다.

---

## 이미지 파일 추가

`static/images/` 폴더를 생성하고 아래 파일을 추가하세요.

```bash
mkdir -p static/images
```

| 파일명 | 권장 크기 | 용도 |
|---|---|---|
| `logo.png` | 가로 200px 이상, 투명 배경 권장 | 네비게이션 로고 |
| `director.jpg` | 세로형 (3:4 비율 권장) | 원장 소개 사진 |

> 이미지가 없어도 사이트가 깨지지 않도록 폴백 처리가 되어 있습니다.

---

## 외부 링크 변경

`index.html` 에서 아래 항목을 직접 수정하세요.

| 항목 | 위치 | 현재 값 |
|---|---|---|
| 네이버 블로그 | `blog-section` | `https://blog.naver.com/tiulenglish` |
| 네이버 톡톡 | `consult-section` | `https://talk.naver.com/profile/wgxoy34/form/1` |
| 카카오톡 채널 | `consult-section` | `https://pf.kakao.com/_Cqynn` |

---

## 페이지 섹션 구성

| 섹션 | ID | 설명 |
|---|---|---|
| 네비게이션 | — | 고정 헤더, 모바일 햄버거 메뉴 |
| 히어로 | `#hero` | 메인 헤드라인 + 상담 문의 CTA |
| 학원 소개 | `#intro` | 철학 + 수강 이유 4가지 |
| 원장 소개 | `#director` | 사진 + 학력 / 경력 / 전문 분야 |
| 수업 안내 | `#schedule` | 레벨 카드 + 주간 시간표 + 1:1 배너 |
| 공지사항 | `#blog` | 네이버 블로그 연결 |
| 상담 문의 | `#consult` | 네이버 톡톡 / 카카오톡 버튼 |
| 푸터 | — | 주소, 연락처, 사업자번호 |

---

## 배포 (운영 서버)

Flask 내장 서버는 개발용입니다. 운영 환경에서는 **Gunicorn + Nginx** 조합을 권장합니다.

```bash
# Gunicorn 설치
pip install gunicorn

# 실행 (workers는 서버 CPU 코어 수 × 2 + 1 권장)
gunicorn -w 2 -b 0.0.0.0:8000 app:app
```

---

## 연락처

- **이메일** tiulenglish@gmail.com  
- **전화** 010-2077-0346  
- **주소** 경기 남양주시 다산중앙로123번길 21-3, 302호

---

&copy; 2026 티울영어. All rights reserved.

---

## PythonAnywhere 배포 가이드

### 최초 배포

**1. Bash 콘솔 열기**

PythonAnywhere 대시보드 → **Consoles** 탭 → **Bash** 클릭

**2. 저장소 클론**

```bash
git clone https://github.com/miyeon00/tiulPage.git
cd tiulPage
```

**3. 가상환경 생성 및 Flask 설치**

```bash
python3.10 -m venv venv
source venv/bin/activate
pip install flask
```

**4. Web App 생성**

대시보드 → **Web** 탭 → **Add a new web app**
- Framework: **Manual configuration**
- Python version: **3.10**

**5. WSGI 파일 수정**

Web 탭 → **WSGI configuration file** 링크 클릭 → 전체 내용 교체:

```python
import sys
import os

path = '/home/tiul/tiulPage'
if path not in sys.path:
    sys.path.insert(0, path)

venv_site = '/home/tiul/tiulPage/venv/lib/python3.10/site-packages'
if venv_site not in sys.path:
    sys.path.insert(0, venv_site)

from app import app as application
```

**6. Web 탭 경로 설정**

| 항목 | 값 |
|---|---|
| Source code | `/home/tiul/tiulPage` |
| Virtualenv | `/home/tiul/tiulPage/venv` |
| Static files URL | `/static/` |
| Static files Directory | `/home/tiul/tiulPage/static` |

**7. Reload 후 확인**

Web 탭 → 초록색 **Reload** 버튼 클릭 → `https://tiul.pythonanywhere.com` 접속

---

### 코드 업데이트 (배포 이후)

로컬에서 수정 → GitHub push 후, PythonAnywhere Bash 콘솔에서:

```bash
cd ~/tiulPage
git pull
```

이후 Web 탭에서 **Reload** 버튼 클릭하면 반영 완료.

**pull + reload 한 번에 처리하는 명령어:**

```bash
cd ~/tiulPage && git pull && touch /var/www/tiul_pythonanywhere_com_wsgi.py
```

즐겨찾기 해두면 편합니다.

---

### 상황별 업데이트 정리

| 상황 | 할 일 |
|---|---|
| `schedule.json` 수정 | `git pull` → Reload |
| HTML / CSS 수정 | `git pull` → Reload |
| 새 패키지 추가 | `git pull` → `pip install 패키지명` → Reload |
| 에러 발생 | Web 탭 → **Error log** 확인 |