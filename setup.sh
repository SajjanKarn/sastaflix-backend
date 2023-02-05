apt update && apt upgrade -y
pkg install git -y
pkg install nodejs -y
pkg install yarn -y

yarn run build

cd ./dist

node server.js