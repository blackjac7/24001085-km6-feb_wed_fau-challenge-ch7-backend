const { getTokenFromHeaders, extractToken } = require("../helpers/auth");
const { getProfile } = require("../usecases/auth/index");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req?.headers);

    const extractedToken = extractToken(token);

    const user = await getProfile(extractedToken?.id);

    if (!user) {
      return next({
        message: "Forbidden!",
        statusCode: 403,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
