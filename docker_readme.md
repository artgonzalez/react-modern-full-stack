#Commands to run to create the front end Docker image

Create the image:

sudo docker build -t blog-frontend .

sudo docker run -it -p 3000:80 blog-frontend

browser URL http://localhost:3000

