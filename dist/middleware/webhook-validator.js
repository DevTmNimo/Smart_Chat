import validateHmac from "./authenticate.hmac.js";
function validHmac(req, res, next) {
    const isValid = validateHmac(req);
    if (!isValid) {
        res.status(401).json({
            "error": "Invalid HMAC signature"
        });
        return;
    }
    res.status(200);
    next();
}
;
export default validHmac;
