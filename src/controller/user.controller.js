const connection = require('../database')
const User = require('../classes/user')

const postUser = (req, res) => {
  let sql;
  let answer;
  let user = new User(req.body.name, req.body.surname, req.body.mail, req.body.photo, req.body.password)
  if (user != null) {
    sql = `INSERT INTO user (name, surname, mail, photo, password) VALUES (\"${user.name}\", \"${user.surname}\",\"${user.mail}\",\"${user.photo}\",\"${user.password}\")`
    answer = { error: false, code: 200, message: "User posted", result: user }
  } else {
    console.log('Error to create');
    answer = { error: true, code: 200, message: 'Error to create' }
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

const login = (req, res) => {
  let user = new User(null, null, req.body.mail, null, req.body.password)
  let sql = `SELECT id_user, name, surname, mail, photo FROM user WHERE user.mail = "${user.mail}" AND user.password = "${user.password}"`
  let answer;
  connection.query(sql, (err, result) => {
    if (!result.length) {
      answer = { error: true, code: 200, message: 'Wrong credentials' }
    } else {
      console.log('Query done');
      answer = result
      console.log(result);
    }
    res.send(answer)
  })
}


module.exports = { postUser, login }

