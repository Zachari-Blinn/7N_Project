const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/token.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const PartyController = require('../controllers/party.controller')

router.post('/', checkAuth, attachCurrentUser, PartyController.party_create)
router.post('/join/:id', checkAuth, attachCurrentUser, PartyController.party_join)
router.post('/left/:id', checkAuth, attachCurrentUser, PartyController.party_left)

module.exports = router
