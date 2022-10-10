/** source/routes/killcounter.ts */
// @ts-ignore
import express from 'express';
import controller from '../controllers/killcounter';
const router = express.Router();

router.get('/flush_kills', controller.weekly_flush);
router.get('/kills/:name', controller.update_kills);

export = router;