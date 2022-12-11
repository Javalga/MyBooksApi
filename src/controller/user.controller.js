const connection = require('../database')
const User = require('../classes/user')

const register = (req, res) => {
  let sql;
  let answer;
  let user = new User(req.body.name, req.body.surname, req.body.email, req.body.photo, req.body.password)
  if (user != null) {
    sql = `INSERT INTO user (name, surname, email, photo, password) VALUES (\"${user.name}\", \"${user.surname}\",\"${user.email}\",\"${user.photo}\",\"${user.password}\")`
    answer = { error: false, code: 200, message: "User posted", result: user }
  } else {
    console.log('User can\'t be null');
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
  let user = new User(null, null, req.body.email, null, req.body.password)
  console.log(user);
  let sql = `SELECT id_user, name, surname, email, photo FROM user WHERE user.email = "${user.email}" AND user.password = "${user.password}"`
  let answer;
  connection.query(sql, (err, result) => {
    if (result.length) {
      console.log('Query done');
      answer = result
      console.log(result);
    } else {
      answer = { error: true, code: 200, message: 'Wrong credentials' }
    }
    res.send(answer)
  })
}


module.exports = { register, login }

