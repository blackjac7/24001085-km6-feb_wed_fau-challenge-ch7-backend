const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
    const jwtPayload = {
        id: user?.id,
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
