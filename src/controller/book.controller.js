const connection = require('../database')
const Book = require('../classes/book')

const getBook = (req, res) => {
  let sql;
  let answer;
  if (!req.query.id_book) {
    sql = `SELECT * FROM book WHERE id_user = ${req.query.id_user}`
  } else sql = `SELECT * FROM book WHERE id_user = ${req.query.id_user} AND id_book = ${req.query.id_book}`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      answer = err
    } else {
      console.log('Query done');
      console.log(result);
      answer = result
    }
    res.send(answer)
  })
}

const postBook = (req, res) => {
  let sql;
  let answer;
  let book = new Book(req.body.id_user, req.body.title, req.body.type, req.body.author, req.body.price, req.body.photo)
  if (book != null) {
    sql = `INSERT INTO book (id_user, title, type, author, price, photo) VALUES (\"${book.id_user}\", \"${book.title}\",\"${book.type}\",\"${book.author}\",\"${book.price}\",\"${book.photo}\" )`
    answer = { error: false, code: 200, message: "Book posted", result: book }
  } else {
    console.log('Book can\'t be null');
    answer = { error: true, code: 200, message: 'Book can\'t be null' }
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      answer = err
    } else {
      console.log('Query done');
      console.log(result);
    }
    res.send(answer)
  })
}

const putBook = (req, res) => {
  let sql;
  let answer;
  let book = new Book(req.body.id_user, req.body.title, req.body.type, req.body.author, req.body.price, req.body.photo)
  book.id_book = req.body.id_book
  if (book != null) {
    sql = `UPDATE book SET id_user = ${book.id_user}, title = "${book.title}", type = "${book.type}", author = "${book.author}", price = ${book.price}, photo = "${book.photo}" WHERE id_book = ${book.id_book}`
    answer = { error: false, code: 200, message: `Book updated with id ${req.body.id_book}`, result: book }
  } else {
    console.log('Book can\'t be null');
    answer = { error: true, code: 200, message: 'Book can\'t be null' }
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      answer = err
    } else {
      console.log('Query done');
      console.log(result);
    }
    res.send(answer)
  })
}

const deleteBook = (req, res) => {
  let sql;
  let answer;
  let id = req.body.id_book
  if (id != null) {
    sql = `DELETE FROM book WHERE id_book = ${id}`
    answer = { error: false, code: 200, message: `Book deleted`, result: id }
  } else {
    console.log('Book ID can\'t be null');
    answer = { error: true, code: 200, message: 'Book ID can\'t be null' }
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      answer = err
    } else {
      console.log('Query done');
      console.log(result);
    }
    res.send(answer)
  })
}
module.exports = { getBook, postBook, putBook, deleteBook }