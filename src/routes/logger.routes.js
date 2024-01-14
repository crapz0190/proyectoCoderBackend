import { Router } from "express";
import { logger } from "../utils/logger.js";
import { env } from "../utils/config.js";

const router = Router();

router.get("/loggerTest", (req, res) => {
  if (env.NODE_ENV === "production") {
    logger.fatal("Probando level fatal desde production"),
      logger.error("Probando level error desde production"),
      logger.warning("Probando level warning desde production"),
      logger.info("Probando level info desde production");
  } else {
    logger.fatal("Probando level fatal"),
      logger.error("Probando level error desde development"),
      logger.warning("Probando level warning desde development"),
      logger.info("Probando level info desde development"),
      logger.http("Probando level http desde development"),
      logger.debug("Probando level debug desde development");
  }
  res.send("Logger Test");
});

export default router;
