import { Router } from 'express';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher, assignSubjectToTeacher } from '../controllers/teacher.controller';

const router = Router();

router.get('/', getTeachers);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);
router.post('/:teacherId/assign-subject', assignSubjectToTeacher);

export default router;
