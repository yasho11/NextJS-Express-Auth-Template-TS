import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { checkAuth, signin, signout, signup, updateProfile } from '../controllers/auth.controlller';



const router = express.Router();

router.get("/auth/check", protectRoute, checkAuth);
router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/signout", signout);
router.put("/auth/update-profile", protectRoute, updateProfile);



export default router;

