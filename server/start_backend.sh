docker build -f Dockerfile -t flashcards_backend .
docker run --name flashcards_database -e POSTGRES_PASSWORD=cashew -e POSTGRES_USER=postgres -e POSTGRES_DATABASE=flashcards -d -p 127.0.0.1:5433:5432 postgres
docker run --name flashcards_backend -it -v ${PWD}:/app -d -p 4002:4000 flashcards_backend
docker exec -it flashcards_backend npm install

docker cp database.sql flashcards_database:/

docker network connect flashcards flashcards_backend
docker network connect flashcards flashcards_database
