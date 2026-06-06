import { Router } from 'express';
import { 
  createClassStream, 
  getAllClassStreams, 
  getClassStreamById 
} from '../controllers/classStream.controller';

const router = Router();

router.post('/', createClassStream);
router.get('/', getAllClassStreams);
router.get('/:id', getClassStreamById);

export default router;
