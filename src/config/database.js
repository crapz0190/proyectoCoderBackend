/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import { env } from "../utils/config.js";
import { logger } from "../utils/logger.js";

const configDB = async () => {
  try {
    await mongoose.connect(env.URI_MONGO);
    logger.info(">> DB is connected <<");
  } catch (e) {
    logger.fatal("Error al conectarse a la DB de Mongo");
  }
};

export default configDB;
