

# back
npm i
sudo pm2 start --name "back/menu-mobile" npm -- start

# front
npm i
npm run build
sudo pm2 start --name "front/menu-mobile" npm -- start

# linux
http://10.100.110.10:6500/
http://10.100.110.10:6700/

docker-compose build
docker-compose up



# AWS
### 테그
TAG="mobile-front-dev"
### 도커 빌드 시 [디렉토리 명]_[docker-compose.yml 파일의 service 이름으로 이미지가 생성된다.]
LOCAL_IMAGE="front_frontend"
### Amazon ECR(Elastic Container Registry)에 컨테이너를 올릴 생각
ECR_REPOSITORY="045825870686.dkr.ecr.ap-northeast-2.amazonaws.com/elixir/menu"

ECR_IMAGE_TAG="$ECR_REPOSITORY:$TAG"

### 지역
#REGION=ap-northeast-2
### Amazon ECS의 클러스터 이름
#CLUSTER_NAME=elixirasp-cluster
### Amazon ECS의 서비스: [이름]
#SERVICE_NAME=elixirmenu-web-front-dev
### ### Amazon ECS의 작업 정의 버전에 따라 :[number] 가 붙을수 있는데 그 부분은 제외하고 적으면 된다.
#TASK_DEFINTION_NAME=elixirmenu-web-front-dev

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $ECR_REPOSITORY
#docker build -t $LOCAL_IMAGE .
docker tag $LOCAL_IMAGE $ECR_IMAGE_TAG
docker push $ECR_IMAGE_TAG

#aws ecs update-service --region "${REGION}" --cluster "${CLUSTER_NAME}" --service "${SERVICE_NAME}" --task-definition "${TASK_DEFINTION_NAME}" --force-new-deployment


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