const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_register = async (req, res) => {
    try {
        // Check if user already existing
        await User.findOne({email: req.body.email}, function (err, user) {
            if(err){
                console.log(err);
            }

            // if user isn't existing crypt password and push to database
            if(!user){
                bcrypt.hash(req.body.password, 10).then(cryptedPassword => {
                    req.body.password = cryptedPassword;
                    req.body.isActive = true;

                    User.create(req.body, function(err, result) {
                        if(err) res.send(err);
                        res.json(result);
                    })
                })
            } else {
                return res.status(409).json({
                    error: "User already existing"
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}