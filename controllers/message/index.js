const messageUsecase = require("../../usecases/message");

exports.getAllMessages = async (req, res, next) => {
    try {
        const data = await messageUsecase.getAllMessages();

        res.status(200).json({
            message: "Messages retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getMessageById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            throw {
                statusCode: 400,
                message: "Invalid id",
            };
        }

        const data = await messageUsecase.getMessageById(id);

        res.status(200).json({
            message: "Message retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createMessage = async (req, res, next) => {
    try {
        let payload = req?.body;

        if (!payload) {
            throw {
                statusCode: 400,
                message: "Invalid payload",
            };
        }

        if (payload.sender_id) {
            payload.sender_id = +payload.sender_id;
        } else {
            throw {
                statusCode: 400,
                message: "Sender id is required",
            };
        }

        const data = await messageUsecase.createMessage(payload);

        res.status(201).json({
            message: "Message created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateMessage = async (req, res, next) => {
    try {
        const id = +req?.params?.id;
        let payload = req?.body;

        if (isNaN(id)) {
            throw {
                statusCode: 400,
                message: "Invalid id",
            };
        }

        if (!payload) {
            throw {
                statusCode: 400,
                message: "Invalid payload",
            };
        }

        if (payload.sender_id) {
            payload.sender_id = +payload.sender_id;
        } else {
            throw {
                statusCode: 400,
                message: "Sender id is required",
            };
        }

        const data = await messageUsecase.updateMessage(id, payload);

        res.status(200).json({
            message: "Message updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        const id = +req?.params?.id;

        if (isNaN(id)) {
            throw {
                statusCode: 400,
                message: "Invalid id",
            };
        }

        await messageUsecase.deleteMessage(id);

        res.status(200).json({
            message: "Message deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
