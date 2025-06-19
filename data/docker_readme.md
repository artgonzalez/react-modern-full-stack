# Commands to run to create the backend Docker image

Run this from the root folder:

sudo docker image build -t blog-backend data/

First stop the local db server
Run this command
sudo docker run -it -e PORT=3000 -e DATABASE_URL=mongodb://host.docker.internal:27017/blog -p 3000:3000 blog-backend