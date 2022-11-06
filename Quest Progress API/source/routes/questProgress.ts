/** source/routes/kill-counter.ts */
// @ts-ignore
import express from 'express';
import controller from '../controllers/questProgress';
const router = express.Router();
router.get('/',controller.home  );
router.get('/api/:uid', controller.getData);
//router.get('/api/:uid/:data', controller.updateDatabase);
//router.post('/api/:uid/:data', controller.updateDatabase);
router.post('/api/:uid', controller.updateJsonDB);
    
export = router;
