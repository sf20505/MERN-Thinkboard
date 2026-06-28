import ratelimit from "../config/upstash.js";

export const ratelimiter = async (req, res, next) => {
    try {
        const identifier = req.ip ?? "anonymous";
        const { success } = await ratelimit.limit(identifier);

        if (!success) {
            return res.status(429).json({ message: "too many requests" });
        }

        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
};
