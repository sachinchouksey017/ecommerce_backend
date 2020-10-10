const userService = require('../services/user_service')
const { body, validationResult } = require('express-validator');
module.exports.register = (req, res) => {
    console.log("data in controller", req.body);
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.register({
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
    }).then(data => {
        return res.send(data).status(data.status)
    }).catch(err => {
        return res.send(err).status(err.status)

    })

}

module.exports.login = (req, res) => {
    console.log("data in controller", req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.login({
        email: 'sachinchouksey017@gmail.com',
        password: '123456',
        firstName: 'sachin',
        lastName: 'chouksey'
    }).then(data => {
        return res.send(data).status(data.status)
    }).catch(err => {
        return res.send(err).status(err.status)

    })

}
module.exports.forget = (req, res) => {
    console.log("data in controller", req.body);
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.forget({
        email: body.email,
        url: body.url ? body.url : 'http://localhost:3000'
    }).then(data => {
        return res.send(data).status(data.status)
    }).catch(err => {
        return res.send(err).status(err.status)

    })

}
module.exports.reset = (req, res) => {
    console.log("data in controller", req.body);
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    userService.reset({
        password: body.password,
        data: body.data
    }).then(data => {
        return res.send(data).status(data.status)
    }).catch(err => {
        return res.send(err).status(err.status)

    })

}