const express = require('express')
const router = express.Router()

const mustBeLoggedIn = require('../middlewares/mustBeLoggedIn.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const PartyController = require('../controllers/party.controller')

router.post('/', mustBeLoggedIn, attachCurrentUser, PartyController.party_create)
router.post('/join/:id', mustBeLoggedIn, attachCurrentUser, PartyController.party_join)
router.post('/left/:id', mustBeLoggedIn, attachCurrentUser, PartyController.party_left)

module.exports = router
