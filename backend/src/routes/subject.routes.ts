import { Router } from 'express';
import { getSubjects, createSubject, getSubjectById } from '../controllers/subject.controller';

const router = Router();

router.get('/', getSubjects);
router.post('/', createSubject);
router.get('/:id', getSubjectById);

export default router;
