exports.validateRegister = (payload) => {
    const { name, email, password, gender } = payload;

    if (!name || typeof name !== "string") {
        throw {
            statusCode: 400,
            message: "Name is required and must be a string",
        };
    }

    if (!email || typeof email !== "string") {
        throw {
            statusCode: 400,
            message: "Email is required and must be a string",
        };
    }

    if (!password || typeof password !== "string") {
        throw {
            statusCode: 400,
            message: "Password is required and must be a string",
        };
    }

    if (
        gender?.toLowerCase() !== "male" &&
        gender?.toLowerCase() !== "female"
    ) {
        throw {
            message: "Gender must be male or female",
            statusCode: 400,
        };
    }
};

exports.validateLogin = (payload) => {
    const { email, password } = payload;

    if (!email || typeof email !== "string") {
        throw {
            statusCode: 400,
            message: "Email is required and must be a string",
        };
    }

    if (!password || typeof password !== "string") {
        throw {
            statusCode: 400,
            message: "Password is required and must be a string",
        };
    }
};
