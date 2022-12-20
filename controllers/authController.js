const UserRepository = require('../repository/user');
const authJWT = require('../auth/authJWT');

exports.login_get = async (req, res) => {
    try {
        res.render('login', 
            { 
                title: 'Login',
            }
        );
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Unable to get login page.'});
    }
}

exports.login_post = async (req, res) => {
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

exports.register_get = async (req, res) => {
    try {
        res.render('register', { title: 'Register'});
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Unable to get register page.' });
    }
}

exports.register_post = async (req, res) => {
    try {
        const user = {};
        const { name, email, password } = req.body;
        user.name = name;
        user.email = email;
        user.password = password;
        console.log(req.formData);
        
        if (await UserRepository.getUserByEmail(email) !== null) {
            return res.status(409).send("User Already Exists. Please Login");
        }
        
        const data = await UserRepository.createUser(user);
        console.log('Registed user::', data);
        res.status(201).redirect('login');
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};