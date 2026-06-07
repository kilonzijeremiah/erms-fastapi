
import { Router } from 'express';
import { 
  createStudent, 
  getAllStudents, 
  getStudentById, 
  updateStudent, 
  deleteStudent, 
  getStudentsByClassStream 
} from '../controllers/student.controller';

const router = Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/class/:classStreamId', getStudentsByClassStream);

export default router;
