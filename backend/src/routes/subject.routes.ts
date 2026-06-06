import { Router } from 'express';
import { 
  createSubject, 
  getAllSubjects, 
  assignSubjectToStream 
} from '../controllers/subject.controller';

const router = Router();

router.post('/', createSubject);
router.get('/', getAllSubjects);
router.post('/assign', assignSubjectToStream);

export default router;
