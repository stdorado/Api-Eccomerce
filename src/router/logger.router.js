import { Router } from "express";
import { addLogger } from "../logger.js";
const router = Router()

router.get("/loggerTest", addLogger, (req, res) => {
    req.logger.fatal("Este es un error fatal");
    req.logger.error("Este es un error");
    req.logger.warning("Este es un aviso");
    req.logger.info("Este es un mensaje informativo");
    req.logger.debug("Este es un mensaje de depuración");
    res.send({ message: "Prueba de logs exitosa" });
});


router.get("/simpleOperation", (req,res)=>{
    req.logger.info("Operación simple realizada");
    res.send("operacion simple realizada")
})

export default router;