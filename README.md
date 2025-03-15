# JEST tutorial for test-driven development
Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

**Windows Note**: If you are on Windows and the above commands do not run
because of NODE_ENV not recognized then first set the environment variable from the terminal using `SET NODE_ENV=test` and then
run the jest command `npx jest --covereage /path/to/test/file`. The coverage is optional.

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests 
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion. 
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service. 
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test
should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

A limitation of the tests in `tests/authorSchema.test.ts` is that the tests are tightly coupled to the
implementation of the author schema. Therefore, any changes made to the schema must also be reflected in the
tests. Since one of the main goals of these unit tests is for us to verify our code is working after
refactoring, we have essentially eliminated the utility of these tests.

## Part 3 //Professor Mitra suggested we skip this part as we are short on time

Generate the coverage report for the tests you wrote. How can you improve
your tests using the coverage report? Briefly explain your 
process in the space below.