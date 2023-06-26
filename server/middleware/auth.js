import jwt from "jsonwebtoken"


export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) return res.status(401).send("Access Denied! No Token Found");

        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
            if (err) {
                return res.status(401).json({message : "Invalid Token!", err : err});
            }
            req.user = decoded;
            next();
        })
        
    } catch (error) {
        res.status(500).json({type : "Auth Token Error", msg : error.message});
    }
}