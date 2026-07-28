import redis from "../../shared/redis.js";

const protect=async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session;
        if (!sessionId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const session =await redis.get(`session:${sessionId}`, (err, sessionData) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = JSON.parse(session);
        next();

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default protect;