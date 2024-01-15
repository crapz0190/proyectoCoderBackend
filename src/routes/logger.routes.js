import { Router } from "express";
import { logger } from "../utils/logger.js";
import { env } from "../utils/config.js";

const router = Router();

router.get("/loggerTest", (req, res) => {
  if (env.NODE_ENV === "production") {
    logger.fatal("Level fatal"),
      logger.error("Level error"),
      logger.warning("Level warnin"),
      logger.info("Level info");
  } else {
    logger.fatal("Level fatal"),
      logger.error("Level error"),
      logger.warning("Level warning"),
      logger.info("Level info"),
      logger.http("Level http"),
      logger.debug("Level debug");
  }
  res.send("Logger Test");
});

export default router;
