import { userRepository } from "../services/repository/users.repository.js";
import { hashData } from "../utils/config.js";
import UserResCurrent from "../dto/user.current.res.dto.js";
import CustomError from "../errors/errors.generator.js";
import { ErrorsMessages } from "../errors/errors.messages.js";

class SessionController {
  // Metodo GET permite desde un boton cerrar sesion
  destroySession = (req, res) => {
    try {
      return req.session.destroy(() => {
        res.redirect("/login");
      });
    } catch (e) {
      CustomError.generateError(ErrorsMessages.INTERNAL_SERVER_ERROR, 500);
    }
  };

  // Metodo POST permite registrarse en la DB
  access = async (req, res) => {
    try {
      const user = await userRepository.findByEmail(req.user.email);
      const userDTO = new UserResCurrent(user);
      console.log("USER DTO ---> ", userDTO);
      return res.redirect("/products");
    } catch (e) {
      CustomError.generateError(ErrorsMessages.INTERNAL_SERVER_ERROR, 500);
    }
  };

  // Metodo POST permite el ingreso del usuario a su cuenta
  loginUser = (req, res) => {
    try {
      res.redirect("/api/sessions/current");
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo POST permite restaurar contraseña
  restorePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        CustomError.generateError(ErrorsMessages.NOT_FOUND, 404);

        // return res.status(404).json({ message: "Email does not exist" });
      }

      const hashPassword = await hashData(password);
      user.password = hashPassword;
      await user.save();
      return res.status(200).json({ message: "Password updated" });
    } catch (e) {
      CustomError.generateError(ErrorsMessages.INTERNAL_SERVER_ERROR, 500);
    }
  };
}

export const sessionController = new SessionController();
