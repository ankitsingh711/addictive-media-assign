import { Router } from 'express';
import { uploadBio, uploadVideo, uploadDp } from '../controllers/uploadController';
import upload from '../midlleware/uploadMiddleware'; 
import uploadPhoto from '../midlleware/uploadPhotoMiddleware'; 
import { authorization } from '../midlleware/authMiddleware';

const router = Router();

router.post('/add-bio', authorization, uploadBio);
router.post('/video', authorization, upload.single('video'), uploadVideo);
router.post("/upload-dp", authorization, uploadPhoto.single("dp"), uploadDp);

export default router;