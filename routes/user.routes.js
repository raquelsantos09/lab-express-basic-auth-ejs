const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guard')


/*


router.post('/signup', async (req, res, next) => {
    console.log(req.body)
    const body = { ...req.body }
    const salt = bcrypt.genSaltSync(13)
    const passswordHash = bcrypt.hashSync(body.password, salt)
    console.log(passswordHash)
    delete body.password
    body.passswordHash = passswordHash
    await User.create(body)
    res.send(body)
})
*/

/* GET home page */
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const body = { ...req.body }

    if (body.password.length < 6) {
        res.render('signup', { errorMessage: 'Password too short', body: req.body })
    } else {
        const salt = bcrypt.genSaltSync(13)
        const passwordHash = bcrypt.hashSync(body.password, salt)
        console.log(passwordHash)

        delete body.password
        body.passwordHash = passwordHash

        try {
            await User.create(body)
            res.send(body)
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate !')
                res.render('signup', {
                    errorMessage: 'Username already used !',
                    userData: req.body,
                })
            } else {
                res.render('signup', {
                    errorMessage: error,
                    userData: req.body,
                })
            }
        }
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    console.log('SESSION =====> ', req.session)
    const body = req.body

    const userMatch = await User.find({ username: body.username })
    console.log(userMatch)
    if (userMatch.length) {
        // User found
        const user = userMatch[0]

        if (bcrypt.compareSync(body.password, user.passwordHash)) {
            // Correct password
            console.log(user)
            res.render('profile', { user })
        } else {
            // Incorrect password
        }
    } else {
        // User not found
    }
})

router.get('/profile', isLoggedIn, (req, res) => {
    console.log('SESSION =====> ', req.session)

    res.render('profile', { user: req.session.user })
})


module.exports = router
