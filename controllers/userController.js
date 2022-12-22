const UserRepository = require('../repository/user');
const authJWT = require('../auth/authJWT');

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
    res.json(data);
}

exports.user_login_get = async (req, res) => {
    try {
        res.render('login');
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Unable to get login page.'});
    }
}

exports.user_profile = async (req, res) => {
    try {
        const { user } = req;
        console.log(req.user);
        const currentUser = await UserRepository.getUserById(user.id);
        res.render('profile', { user: currentUser});
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Unable to get user profile page.'});
    }
}

exports.user_login_post = async (req, res) => {
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

        const token = authJWT.createJWT(user);
        res.cookie('id', token);
        return res.status(200).redirect('/posts');
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error attempting to login' });
    }
}

exports.user_update = async (req, res) => {
    try {
        const { userId } = req.params;
        const { user } = req.body;

        user.id = userId;
        user.updatedAt = Date.now();

        const newUser = await PostRepository.updatePost(user);
        return res.status(200).send(newUser);
    } catch (e) {
        console.log(e);
        res.send({ message: e });
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