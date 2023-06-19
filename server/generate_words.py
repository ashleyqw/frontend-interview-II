import random

base_query = "INSERT INTO flashcards (term, definition) VALUES ('sample term', '{}');"
sample_definition = "sample definition"

# Load a local dictionary file
with open("dictionary.txt", "r") as file:
    dictionary = file.read().splitlines()

# Generate a list of 10000 queries with random definitions
queries = []
for i in range(1, 100010):
    random_word = random.choice(dictionary)  # Get a random word from the dictionary
    definition = f"{random_word}"  # Modify the definition for each query
    query = base_query.format(definition)
    queries.append(query)

# Write the list of queries to a file
with open("results.txt", "w") as file:
    file.write("\n".join(queries))

