import { usersModel } from "../models/users.model.js";
import BasicDAO from "./basic.dao.js";

class UserDAO extends BasicDAO {
  constructor() {
    super(usersModel);
  }

  async findByEmail(email) {
    try {
      const response = await usersModel.findOne({ email });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const usersDAO = new UserDAO();
