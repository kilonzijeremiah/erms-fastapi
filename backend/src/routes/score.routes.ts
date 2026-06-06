import { Router } from 'express';
import { 
  recordScore, 
  getStudentScores, 
  getClassPerformance 
} from '../controllers/score.controller';

const router = Router();

router.post('/', recordScore);
router.get('/student/:studentId', getStudentScores);
router.get('/class/:classStreamId/subject/:subjectId', getClassPerformance);

export default router;
