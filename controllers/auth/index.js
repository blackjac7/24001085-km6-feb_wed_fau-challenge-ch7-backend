const { register, login, googleLogin } = require("../../usecases/auth");
const { validateRegister, validateLogin } = require("../../helpers/validation");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, gender } = req?.body;
        const payload = { name, email, password, gender };
        const photo = req?.files?.photo;

        validateRegister(payload);

        const data = await register({
            name,
            email,
            password,
            gender: gender.toLowerCase(),
            photo,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const payload = req?.body;

        validateLogin(payload);

        const data = await login(payload);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.googleLogin = async (req, res, next) => {
    try {
        const { access_token } = req?.body;

        if (!access_token) {
            throw {
                statusCode: 400,
                message: "Access token must be provided!",
            };
        }

        const data = await googleLogin(access_token);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.profile = async (req, res, next) => {
    try {
        const data = req.user;

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
