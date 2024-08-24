import express from 'express';
import { authorization } from '../midlleware/authMiddleware';
import { getAllVideos, getUserVideos } from '../controllers/userController';

const router = express.Router();
router.get('/user-videos/all', authorization, getAllVideos);
router.get('/user-videos/:userId', authorization, getUserVideos);

export default router;