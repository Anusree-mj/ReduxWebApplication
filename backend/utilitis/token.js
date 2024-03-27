import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), secure: false });
}

const generateAdminToken = (res, adminId) => {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwtAdmin', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), secure: false });
}
export { generateToken, generateAdminToken };