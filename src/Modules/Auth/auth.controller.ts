import { Router } from "express";
import AuthService from "./auth.service";
import { validation } from "../../Middlewares/validation.middleware";
import { signupSchema , loginSchema , confirmEmailSchema } from "./auth.validation";
const router: Router = Router();

router.post("/signup", validation(signupSchema), AuthService.signup);
router.post("/login", validation(loginSchema) , AuthService.login);
router.patch("/confirm-email",validation(confirmEmailSchema), AuthService.confirmEmail);

export default router;