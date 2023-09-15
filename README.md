

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




