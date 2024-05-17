const userUsecase = require("../../usecases/user");
const { validateRegister } = require("../../helpers/validation");

exports.updateUser = async (req, res, next) => {
    try {
        const id = +req?.user?.id;
        const { name, email, password, gender } = req?.body;
        let payload = { name, email, password, gender };
        const photo = req?.files?.photo;

        validateRegister(payload);

        if (photo) {
            payload.photo = photo;
        }

        payload = { ...payload, photo };

        const data = await userUsecase.updateUser(id, payload);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
