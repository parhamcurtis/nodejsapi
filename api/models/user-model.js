const {Sequelize, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const mysql = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {min: 0, max: 5}
});

const User = mysql.define('User',{
    fname: {
        type: DataTypes.STRING
    },
    lname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING(155),
        unique: true,
        validate: {
            isEmail: {msg: "Must be a valid email."}
        }
    },
    password: {
        type: DataTypes.STRING(75),
        validate: {
            len: {
                msg: "Password must be at least 8 characters.",
                args: [8, 255]
            }
        }
    }
},{
    indexes: [
        {fields:['email']}
    ]
});

User.sync();

User.beforeCreate(async (user, options) => {
    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;
});

User.beforeSave(async (user, options) => {
    if(user.updatePassword) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
    }
})

module.exports = User;