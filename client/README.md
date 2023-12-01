# Pallet frontend interview II

## Setup

In the terminal, run `./setup.sh`. Once the setup script is complete, open the app by going to the "PORTS" tab next to the terminal, and clicking the "Open in browser" button for Port 4001.

## Prompt

This interview is meant to test more advanced concepts in data fetching, react, and API building. The majority of the code will be on the frontend, but you may have to create a new endpoint for one of the challenges ;).

There are three main issues with the application:

1. Save all does not work.
2. There is a lag when you type into one of the input boxes.
3. The autocomplete is quite slow, and when you press back crashes the page. We would like the autocomplete to scale to 10x more suggestions than it currently has.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `API`

The API has the following endpoint available:

```
GET /2xEm7s/flashcards

GET filter /2xEm7s/flashcards?term=value

GET by id /2xEm7s/flashcards/1

GET paginate /2xEm7s/flashcards?_page=2&_limit=10

POST /2xEm7s/flashcards

PUT /2xEm7s/flashcards/1

PATCH /2xEm7s/flashcards/1

DELETE /2xEm7s/flashcards/1
```
