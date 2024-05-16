const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { User } = require("../../models");
const { uploader } = require("../../helpers/cloudinary");

exports.getUserById = async (id) => {
    const data = await User.findByPk(id);

    if (!data) {
        throw { statusCode: 404, message: `User with id ${id} not found` };
    }

    return data;
};

exports.getUserByEmail = async (email) => {
    const opt = {
        where: { email },
    };

    const data = await User.findOne(opt);

    return data;
};

exports.createUser = async (payload) => {
    payload.password = await bcrypt.hash(payload.password, 10);

    if (payload.photo) {
        const { photo } = payload;

        photo.publicId = crypto.randomBytes(16).toString("hex");

        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        const imageUpload = await uploader(photo);

        payload.photo = imageUpload.secure_url;
    }

    const data = await User.create(payload);

    return data;
};

exports.getGoogleAccessTokenData = async (access_token) => {
    const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    return data;
};
