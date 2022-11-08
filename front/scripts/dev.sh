TAG="mobile-front-dev"
LOCAL_IMAGE="front_frontend"
ECR_REPOSITORY="045825870686.dkr.ecr.ap-northeast-2.amazonaws.com/elixir/menu"

ECR_IMAGE_TAG="$ECR_REPOSITORY:$TAG"

#REGION=ap-northeast-2
#CLUSTER_NAME=elixirasp-cluster
#SERVICE_NAME=elixirmenu-web-front-dev
#TASK_DEFINTION_NAME=elixirmenu-web-front-dev

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $ECR_REPOSITORY
#docker build -t $LOCAL_IMAGE .
docker tag $LOCAL_IMAGE $ECR_IMAGE_TAG
docker push $ECR_IMAGE_TAG

#aws ecs update-service --region "${REGION}" --cluster "${CLUSTER_NAME}" --service "${SERVICE_NAME}" --task-definition "${TASK_DEFINTION_NAME}" --force-new-deployment
