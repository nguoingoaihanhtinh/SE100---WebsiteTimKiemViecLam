// import express from 'express';
// import * as TestController from '../controllers/testController.js';

// const testRouter = express.Router();

// /**
//  * @swagger
//  * /api/test/books:
//  *   get:
//  *     summary: Get all books
//  *     responses:
//  *       200:
//  *         description: List of books
//  */
// testRouter.route('/books').get(TestController.getAllBooks);

// /**
//  * @swagger
//  * /api/test/books/{name}:
//  *   get:
//  *     summary: Get a book by its name
//  *     parameters:
//  *       - name: name
//  *         in: path
//  *         description: Name of the book to retrieve
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: The book found
//  *       404:
//  *         description: Book not found
//  */
// testRouter.route('/books/:name').get(TestController.getBookByName);

// export default testRouter;
