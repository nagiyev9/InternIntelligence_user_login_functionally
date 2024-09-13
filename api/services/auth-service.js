// Path And Imports
const User = require('../models/User');
const Refresh = require('../models/RefreshToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Get User By Email 
exports.getUserByEmail = async email => {
    const user = await User.findOne({ where: { email: email } });
    return user;
};

// Get All Tokens
exports.getAllTokens = async () => {
    const tokens = await Refresh.findAll();
    return tokens;
};

// Remove Expired Tokens
exports.removeExpiredTokens = async () => {
    const now = new Date();
    await Refresh.destroy({ where: { expiresAt: { [Op.lt]: now } } });
};

// Register 
exports.register = async user => {
    const { username, email, password } = user;

    const isExist = await this.getUserByEmail(email);

    if (isExist) {
        return { status: 409, message: 'This Email already registered' };
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    return { status: 200, message: 'Register Successfull! You can login' };
};

// Access Token
exports.refreshAccessToken = async refreshToken => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

        const savedToken = await Refresh.findOne({ token: refreshToken });

        if (!savedToken) {
            return { status: 403, message: "Invalid refresh token!" };
        };

        const newAccessToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return { status: 200, accessToken: newAccessToken };

    } catch (error) {
        return { status: 403, message: "Refresh token expired or invalid!" };
    };
};

// Login
exports.login = async user => {
    const { email, password } = user;

    const isExist = await this.getUserByEmail(email);

    if (!isExist) {
        return { status: 404, message: 'User Not Found!' };
    };

    const isPasswordValid = await bcrypt.compare(password, isExist.password);

    console.log("Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
        return { status: 403, message: 'Invalid Password!' };
    };

    await Refresh.destroy({
        where: {
            userId: isExist.id,
            expiresAt: {
                [Op.lt]: new Date()
            }
        }
    });

    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await Refresh.create({
        token: refreshToken,
        expiresAt,
        userId: isExist.id
    });

    return {
        status: 200,
        message: "Login successful",
        user: { id: isExist.id, email: isExist.email, username: isExist.username, expiresAt: expiresAt },
        accessToken,
        refreshToken,
    };
};

// Logout
exports.logout = async userId => {
    await Refresh.destroy({ where: { userId: userId } });
    return { status: 200, message: "Logout successful" };
};