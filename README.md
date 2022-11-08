

# back
npm i
sudo pm2 start --name "back/menu-mobile" npm -- start

# front
npm i
npm run build
sudo pm2 start --name "front/menu-mobile" npm -- start




###
## backend
### web-back-dev (이미지 태그 네임)
- 포트번호: 4500
- 라우팅경로: /api
- 헬스체크 경로: /system/health
- 환경변수
  PORT=4500
  PATHNAME=/api
  VERSION=v1
  API_URL=https://asp.test.elixir.codes/api/menuc
## frontend
### web-front-dev (이미지 태그 네임)
- 포트번호: 4700
- 라우팅경로: /store
- 헬스체크 경로: /api/system/health
- 환경변수
  NEXT_PUBLIC_BACK_URL=[개발용 백엔드 서버 주소]/api/v1
---
# Product
## backend
### web-back-prod (이미지 태그 네임)
- 포트번호: 4500
- 라우팅경로: /api
- 헬스체크 경로: /system/health
- 환경변수
  PORT=4500
  PATHNAME=/api
  VERSION=v1
  API_URL=https://asp.elixirpay.co.kr/api/menuc
---
## frontend
### web-front-prod (이미지 태그 네임)
- 포트번호: 4700
- 라우팅경로: /store
- 헬스체크 경로: /api/system/health
- 환경변수
  NEXT_PUBLIC_BACK_URL=[배포용 백엔드 서버 주소]/api/v1

### git hub
…or create a new repository on the command line
echo "# asdfasdfasdf" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/rae-han/mobile-menu-sample.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/rae-han/mobile-menu-sample.git
git branch -M main
git push -u origin main

…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.