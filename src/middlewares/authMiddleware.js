export function authorizerUser(req,res,next){
const role = req.session.role
if (role === "admin" || role ==="premium"){
    next()
}else{
    res.status(403).json({error : "Acceso no autorizado, sube de categoria para acceder aqui"})
}
}

export const requireAuth = (req, res, next) => {
    if (req.session && req.session.email) {
      req.user = {
        email: req.session.email,
        role : req.session.role
      };
      next();
    } else {
      res.status(401).json({ error: 'Debes Iniciar Sesion ' });
    }
  };