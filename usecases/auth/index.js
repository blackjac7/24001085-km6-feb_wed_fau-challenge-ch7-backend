const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    getUserByEmail,
    createUser,
    getUserById,
} = require("../../repositories/user");

exports.register = async (payload) => {
    const existingUser = await getUserByEmail(payload.email);

    if (existingUser) {
        throw { statusCode: 400, message: "Email already registered" };
    }

    const user = await createUser(payload);

    delete user.dataValues.password;

    const jwtPayload = {
        id: user.id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "3h",
    });

    const data = {
        user,
        token,
    };

    return data;
};

exports.login = async (payload) => {
    const user = await getUserByEmail(payload.email);

    if (!user) {
        throw {
            statusCode: 400,
            message: "Wrong email or password",
        };
    }

    const isPasswordMatch = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (!isPasswordMatch) {
        throw { statusCode: 400, message: "Wrong email or password" };
    }

    if (user?.dataValues?.password) {
        delete user?.dataValues?.password;
    } else {
        delete user?.password;
    }

    const jwtPayload = {
        id: user.id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "3h",
    });

    const data = {
        user,
        token,
    };

    return data;
};

exports.getProfile = async (id) => {
    const user = await getUserById(id);

    if (!user) {
        throw { statusCode: 404, message: `User with id ${id} not found` };
    }

    if (user?.dataValues?.password) {
        delete user?.dataValues?.password;
    } else {
        delete user?.password;
    }

    return user;
};
