import express from 'express';
import {editProfile, loginUser, registerUser, viewProfile} from '../controllers/auth.Controller'
import { protect } from '../middleware/auth';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, viewProfile);
router.put('/profile', protect, editProfile);



export default router;