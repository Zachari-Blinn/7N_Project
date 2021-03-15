const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/security/token.security')
const attachCurrentUser = require('../middlewares/security/attachCurrentUser.security')

const PartyController = require('../controllers/party.controller')

router.post('/', checkAuth, attachCurrentUser, PartyController.party_create)
router.post('/join/:id', checkAuth, attachCurrentUser, PartyController.party_join)
router.post('/left/:id', checkAuth, attachCurrentUser, PartyController.party_left)

module.exports = router
