const messageRepo = require("../../repositories/message");
const userRepo = require("../../repositories/user");

exports.getAllMessages = async () => {
    const data = await messageRepo.getAllMessages();

    return data;
};

exports.getMessageById = async (id) => {
    const data = await messageRepo.getMessageById(id);

    return data;
};

exports.createMessage = async (payload) => {
    await userRepo.getUserById(payload.sender_id);

    const data = await messageRepo.createMessage(payload);

    return data;
};

exports.updateMessage = async (id, payload) => {
    await messageRepo.getMessageById(id);

    await userRepo.getUserById(payload.sender_id);

    const data = await messageRepo.updateMessage(id, payload);

    return data;
};

exports.deleteMessage = async (id) => {
    await messageRepo.getMessageById(id);

    const data = await messageRepo.deleteMessage(id);

    return data;
};
