# Holofy.io Assignment

### Setup
- Install NodeJS, NPM and MongoDB
- After installation, go to the directory and type `npm install`
- Once all node modules are installed, lets start the server using command `node index.js`
- Navigate to http://localhost:3000

## Endpoints:
1. Add book:- POST call -  http://localhost:300/book/add
2. Get books:- GET call - http://localhost:3000/books
3. Get book details:-  GET call - http://localhost:3000/\<bookId\>
4. Update book details:- PATCH call - http://localhost:3000/\<bookId\>/update
5. Delete book:- DELETE call - http://localhost:300/\<bookId\>/delete

## Directory Structure:
<pre>
├── controllers
│   └── books.js
├── index.js
├── models
│   └── bookModel.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   └── books.js
└── utils.js
</pre>
