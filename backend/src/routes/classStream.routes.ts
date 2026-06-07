import { Router } from 'express';
import { getClassStreams, createClassStream, getClassStreamById } from '../controllers/classStream.controller';

const router = Router();

router.get('/', getClassStreams);
router.post('/', createClassStream);
router.get('/:id', getClassStreamById);

export default router;
