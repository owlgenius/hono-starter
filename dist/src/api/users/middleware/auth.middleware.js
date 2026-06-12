import { UnauthorizedError } from "../../../utils/errors.js";
export const authMiddleware = async (c, next) => {
    // verify JWT here
    const userId = 1;
    if (!userId) {
        throw new UnauthorizedError("Unauthorized", "UNAUTHORIZED");
    }
    c.set("userId", userId);
    await next();
};
