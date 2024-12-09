const User = require('../models/UserModel')
// BCRYPT
const bcrypt = require('bcrypt');
// json web token
const jwt = require('jsonwebtoken');
// REGISTER USER
const secret = process.env.SECERT;
exports.signup = async (req, res)=> {
    try {
        const {firstname, lastname, username, age, email, password, confirmPassword, createdOn} = req.body

        if (!firstname || !lastname || !username || !age || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password!==confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
        const userEmail = await User.findOne({email})
        if(userEmail) return res.status(400).json({ message: 'Email already exists' });

        const user = await User.findOne({username})
        if(user) return res.status(400).json({ message: 'Username already exists' });

        const hashedPassword = bcrypt.hashSync(password , 10)
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            age: age,
            email : email,
            password: hashedPassword,
            createdOn
        })
        await newUser.save()

        const token = jwt.sign({id: newUser._id}, secret, { expiresIn: '1h' });

        res.status(201).json({
            status : 'seccess',
            message: 'User registered sucessfilly',
            token,
            user:{
                _id: newUser._id,
                firstname : firstname,
                lastname : lastname,
                username : username,
                age: age,
                email: email,
            }
        });

    } catch (error) {
        res.status(500).json({message : "Failed to register user!"})
    }
}

// LOGIN USER
exports.login= async (req, res)=> {
    try {
        const {email, password} = req.body;
        if (!email ||!password) return res.json({message : "Please provide email and password!"});
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message : "User not found!"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({message : "Incorrect email or password!"});

        const token = jwt.sign({id: user._id}, secret, { expiresIn: '1h' });

        res.status(201).json({
            status : 'seccess',
            token,
            message: 'Login in sucessfilly',
            user:{
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
