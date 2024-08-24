import express from 'express';
import { authorization } from '../midlleware/authMiddleware';
import { getUserVideos, getAllUserVideos } from '../controllers/userController';

const router = express();

router.get('/user-videos', authorization, getUserVideos);
router.get('/user-videos/all', authorization, getAllUserVideos);

export default router;