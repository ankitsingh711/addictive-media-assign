import { Router } from 'express';
import { uploadBio } from '../controllers/uploadController';
import { authorization } from '../midlleware/authMiddleware';

const router = Router();

router.post('/add-bio', authorization, uploadBio);

export default router;