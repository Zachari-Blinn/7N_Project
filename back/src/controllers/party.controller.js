const Party = require('../models/party')

/**
 * @description Create a new Party
 * @api POST /api/party
 * @access PRIVATE
 */
exports.party_create = (req, res) => {
  try {
    const { name, description, location, startedAt, expireAt, finishedAt } = req.body

    const newParty = new Party({
      name: name,
      description: description,
      location: location,
      startedAt: startedAt,
      expireAt: expireAt,
      finishedAt: finishedAt,
      createdBy: req.currentUser,
      isActive: true
    })

    newParty.save((err, party) => {
      res.status(201).json({
        party,
        sucess: true,
        message: 'Party successfully created'
      })
    })
  } catch (err) {
    console.log('err' + err)

    return res.status(500).json({
      sucess: false,
      message: 'Something went wrong.'
    })
  }
}

/**
* @description Join a Party
* @api POST /api/party/join/:id
* @access PRIVATE
*/
exports.party_join = async (req, res) => {
  try {
    const partyId = req.params.id
    const currentUser = req.currentUser

    const party = await Party.findOne({ _id: partyId })
    if (!party) {
      res.status(404).json({
        sucess: false,
        message: 'Party not found!'
      })
    }

    party.participants.push(currentUser)

    currentUser.parties.push(party)

    const saveUser = await currentUser.save()
    const saveParty = await party.save()

    res.status(200).json({
      saveUser,
      saveParty,
      sucess: true,
      message: 'User successfully joined party'
    })
  } catch (err) {
    console.log('err' + err)

    return res.status(500).json({
      sucess: false,
      message: 'Something went wrong.'
    })
  }
}

/**
* @description Left a Party
* @api POST /api/party/left/:id
* @access PRIVATE
*/
exports.party_left = async (req, res) => {
  try {
    const partyId = req.params.id
    const currentUser = req.currentUser

    const party = await Party.findOne({ _id: partyId })
    if (!party) {
      res.status(404).json({
        sucess: false,
        message: 'Party not found!'
      })
    }

    party.participants.pop(currentUser)

    currentUser.parties.pop(party)

    const saveUser = await currentUser.save()
    const saveParty = await party.save()

    res.status(200).json({
      saveUser,
      saveParty,
      sucess: true,
      message: 'User successfully left party'
    })
  } catch (err) {
    console.log('err' + err)

    return res.status(500).json({
      sucess: false,
      message: 'Something went wrong.'
    })
  }
}
