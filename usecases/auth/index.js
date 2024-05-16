const bcrypt = require("bcrypt");
const {
    getUserByEmail,
    createUser,
    getUserById,
    getGoogleAccessTokenData,
} = require("../../repositories/user");
const { createToken } = require("../../helpers/createToken");

exports.register = async (payload) => {
    const existingUser = await getUserByEmail(payload.email);

    if (existingUser) {
        throw { statusCode: 400, message: "Email already registered" };
    }

    const user = await createUser(payload);

    delete user?.dataValues?.password;

    const data = createToken(user);

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

    const data = createToken(user);

    return data;
};

exports.googleLogin = async (access_token) => {
    const googleData = await getGoogleAccessTokenData(access_token);

    if (!googleData) {
        throw { statusCode: 400, message: "Invalid access token" };
    }

    let user = await getUserByEmail(googleData?.email);

    if (!user) {
        user = await createUser({
            name: googleData?.name,
            email: googleData?.email,
            password: "",
            photo: googleData?.picture,
        });
    }

    delete user?.dataValues?.password;

    const data = createToken(user);

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
