const User = require('../model/user');
const UserRepository = require('../repository/user');
const jwt = require('jsonwebtoken');

exports.user_list = async (req, res) => {
    const data = await UserRepository.getUsers();
    console.log(`${JSON.stringify(data)}`);
    res.send(`${JSON.stringify(data)}`);
};

exports.user_register = async (req, res) => {
    const { user } = req.body;
    
    if (await UserRepository.getUserByEmail(user.email) !== null) {
        return res.status(409).send("User Already Exists. Please Login");
    }
    
    const data = await UserRepository.createUser(user);
    console.log('Registed user::', data);
    res.status(201).json(data);
};

exports.user_get = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const data = await UserRepository.getUserById(userId);
    res.send(`${JSON.stringify(data)}`);
}

exports.user_login = async (req, res) => {
    try {
        console.log(req.body);
        const { email , password } = req.body;
        const user = await UserRepository.getUserByEmail(email);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        if (password !== user.password) {
            return res.status(401).send({ message: 'Invalid Password!'});
        }

        const token = jwt.sign({ id: user.id }, 'secret');
        console.log('req:::',req);
        req.cookies = token;
        console.log('***cookies:::',req.cookies);
        return res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error attempting to login' });
    }
}

exports.user_delete = async (req, res) => {
    const { userId } = req.params;
    await UserRepository.deleteUser(userId);
    res.status(200).send(`Successfully deleted user: ${userId}`);
}

exports.user_delete_all = async (req, res) => {
    await UserRepository.deleteAll();
    res.status(200).send('Successfully deleted all users');
}