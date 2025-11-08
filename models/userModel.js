const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    department: { type: String, require: true },
    businessUnit: { type: String, require: true },
    usertype: { type: String, require: true, default: "user" },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    const isvalid = await bcrypt.compare(password, this.password);

    return isvalid;
};

module.exports = mongoose.model('User', userSchema);



