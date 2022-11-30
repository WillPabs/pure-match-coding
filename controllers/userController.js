const User = require('../model/user');
const UserRepository = require('../repository/user');

exports.user_list = async (req, res) => {
    const data = await UserRepository.getUsers();
    console.log(`${JSON.stringify(data)}`);
    res.send(`${JSON.stringify(data)}`);
};

exports.user_create_post = async (req, res) => {
    const data = await UserRepository.createUser(req.body.user);
    res.send(`${JSON.stringify(data)}`);
};