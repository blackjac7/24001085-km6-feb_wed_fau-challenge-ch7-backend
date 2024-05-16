const { Message } = require("../../models");

exports.getAllMessages = async () => {
    const data = await Message.findAll();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No messages found" };
    }

    return data;
};

exports.getMessageById = async (id) => {
    const data = await Message.findByPk(id);

    if (!data) {
        throw { statusCode: 404, message: `Message with id ${id} not found` };
    }

    return data;
};

exports.createMessage = async (payload) => {
    const data = await Message.create(payload);

    return data;
};

exports.updateMessage = async (id, payload) => {
    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Message.update(payload, opt);

    return data[1][0];
};

exports.deleteMessage = async (id) => {
    const opt = {
        where: { id },
    };

    const data = Message.destroy(opt);

    return data;
};
