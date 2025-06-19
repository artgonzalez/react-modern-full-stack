# Commands to run to create the backend Docker image

Run this from the root folder:

sudo docker image build -t blog-backend data/

First stop the local db server
Windows: Run this command
sudo docker run -it -e PORT=3001 -e DATABASE_URL=mongodb://host.docker.internal:27017/blog -p 3001:3001 blog-backend

Linux: run this command 
sudo docker run -it -e PORT=3001 -e DATABASE_URL=mongodb://172.17.0.1:27017/blog -p 3001:3001 blog-backend