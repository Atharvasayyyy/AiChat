import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
import crypto from "crypto";
import User from "../model/user.model.js"; // adjust the path if needed

initializeApp({
    credential: cert(serviceAccount),
});

export const login = async (req, res) => {
    try {
        const { token } = req.body;

        const decoded = await getAuth().verifyIdToken(token);

        let user = await User.findOne({
            FirebaseUID: decoded.uid,
        });

        if (!user) {
            user = await User.create({
                FirebaseUID: decoded.uid,
                email: decoded.email,
                name: decoded.name,
                avatar: decoded.picture,
            });
        }

        if (user) { 
            console.log("User found or created:", user);
        }

        const sessionId = crypto.randomUUID();

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({
            message: "Login successful",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};