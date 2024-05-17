const userRepo = require("../../repositories/user");

exports.updateUser = async (id, payload) => {
    await userRepo.getUserById(id);

    const data = await userRepo.updateUser(id, payload);

    return data;
};
