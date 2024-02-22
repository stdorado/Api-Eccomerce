export const requireAuth = async (req, res, next) => {
    try {
        if (req.session && req.session.user) {

            next();
        } else if (req.user && req.user.authMethod === "Google") {

            next();
        } else {

            res.render("errorToSession");
        }
    } catch (error) {
        console.error('Error en middleware requireAuth:', error);
        res.status(401).json("error to middleware")
    }
};