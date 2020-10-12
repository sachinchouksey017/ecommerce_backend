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
        return res.status(data.status).send(data)
    }).catch(err => {
        return res.status(err.status).send(err)

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
        email: req.body.email,
        password: req.body.password,
    }).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        return res.status(err.status).send(err)

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
        return res.status(data.status).send(data)
    }).catch(err => {
        return res.status(err.status).send(err)

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
        return res.status(data.status).send(data)
    }).catch(err => {
        return res.status(err.status).send(err)

    })

}