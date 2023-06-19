docker network create flashcards

docker build -f Dockerfile -t flashcards_frontend .
docker run --name flashcards_frontend -it -v ${PWD}/src:/app/src -d -p 4001:3000 flashcards_frontend
docker network connect flashcards flashcards_frontend
