

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


안녕하세요. 이번에 새로운 프로젝트를 시작하게 됐는데 테스트 서버를 미리 `Amazon ECS`에 서비스 된 상태로 할수 있을까요?? 예전에 제 실수로 배포 환경을 생각 못하고 수정한 적이 있어서 부탁드립니다.
현재 리눅스에서 작동 확인 후 `docker-compose build -> up` 사용하여 다시 한번 더 확인했고 예전에 말씀해주신 `Amazon ECR`의 `elixir/menu` 레포지토리에 `mobile-back-dev`, `mobile-front-dev` 라는 이미지 이름으로 올려놨습니다.
도메인 네임은 당장 연결할 필요 없이 제가 확인만 하면 될거 같은데 가능할까요??

설정 값은 아래와 같습니다.

- back(이미지 태그 네임: mobile-back-dev)
```markdown
# 포트번호
- 6500

# 라우팅 경로
- /api

# .env
PORT=6500
PATHNAME=api
DEVELOP_API_URL=https://asp.test.elixir.codes/api/menuc
TEST_API_URL=https://asp.test.elixir.codes/api/menuc
PRODUCT_API_URL=https://asp.elixirpay.co.kr/api/menuc
RELEASE_API_URL=https://asp.elixirpay.co.kr/api/menuc
API_URL=https://asp.test.elixir.codes/api/menuc

# health check
/api/v1/system/health
```

-front(이미지 태그 네임: mobile-front-dev)
```markdown
# 포트번호
- 6700

# 라우팅 경로
- /m

# .env
NEXT_PUBLIC_BACK_URL=http://10.100.110.10/:6500/api/v1
## 위 주소는 [위 서버 주소]/api/v1 으로 해주시면 감사합니다.

# health check
/api/system/health
```

Amazon -> EC2 -> 로드 밸런싱 -> 로드밸런서 -> 선택(elixirmenu-lb) -> 리스터 -> https:443의 규칙

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