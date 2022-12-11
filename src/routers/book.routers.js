const { Router } = require("express")
const router = Router()
const bookCtrl = require('../controller/book.controller')

router.get('/book', bookCtrl.getBook)
router.post('/book', bookCtrl.postBook)
router.put('/book', bookCtrl.putBook)
router.delete('/book', bookCtrl.deleteBook)
module.exports = router 