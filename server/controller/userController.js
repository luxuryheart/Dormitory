const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const User = require('../models/user/userModel');
const Role = require('../models/user/roleModel');

const addRole = async (req, res) => {
    try {
        const role = await new Role(req.body).save()

        res.status(201).json({message: "Add role success", role})
    } catch (error) {
        res.status(400).json({message: "Function invalid: " + error})
    }
}

const Signup = async (req, res) => {
    try {

        const checkUser = await User.findOne({ email: req.body.email })

        if (checkUser) {
            res.status(401).json({message: 'มีผู้ใช้นี้อยู่แล้ว'})
        }

        const user = await User({
            profile: req.body.profile,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            tel: req.body.tel,
            gender: req.body.gender,
            role_id: req.body.role_id
        }).save();
    
        res.status(201).json({message: 'Sign up success', user})
    } catch (error) {
        res.status(400).json(error)
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;
    const key = process.env.KEY
    
    try {
        let user = await User.findOneAndUpdate({email}, { new: true });

        if (user) {
            let role = await Role.findOne({_id: user.role_id}).exec();
            const passMatch = await bcrypt.compare(password, user.password)
            if (!passMatch) {
                return res.status(401).send('รหัสผ่านไม่ถูกต้อง!!');
            }

            let payload = {
                user: {
                    id: user._id,
                    proflie: user.profile,
                    email: user.email,
                    tel: user.tel,
                    role: role.role,
                }
            }

            jwt.sign(payload, key, {expiresIn: '30d'}, (err, token) => {
                if (err) throw err;
                res.json({ message: 'เข้าสู่ระบบสำเร็จ', token, payload  });
            })
        } else {
            return res.status(401).send('ไม่พบผู้ใช้งาน!!')
        }

    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports = {
    Signup,
    addRole,
    Login
}