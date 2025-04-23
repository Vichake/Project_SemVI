import admin from "../config/firebase.js";

export const verifyFirebaseToken = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized user"})
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error("Invalid Firebase token",err);
        res.status(401).json({message: "Invalid or expired token"})
    }
}