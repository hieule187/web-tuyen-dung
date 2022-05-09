const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/RecruitmentController');
const uploadMulter = require('../utils/uploadImage');
const app = express();
const passport = require('passport');

app.use(passport.initialize());
require('../configs/passport');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadMulter,
  recruitmentController.createRecruitment,
);
router.get('/', recruitmentController.getRecruitment);
router.get(
  '/my-recruitment',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.getMyRecruitment,
);
router.get(
  '/recruitment-true',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.getTrueRecruitment,
);
router.get(
  '/recruitment-false',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.getFalseRecruitment,
);
router.get('/:id', recruitmentController.getRecruitmentById);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.updateRecruitment,
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.deleteRecruitment,
);
router.post('/search', recruitmentController.searchRecruitment);
router.post('/quick-search', recruitmentController.quickSearchRecruitment);
router.put(
  '/browse-recruitment/:id',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.browseRecruitment,
);
router.put(
  '/miss-recruitment/:id',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.missRecruitment,
);
router.put(
  '/lock-recruitment/:id',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.lockRecruitment,
);
router.put(
  '/unlock-recruitment/:id',
  passport.authenticate('jwt', { session: false }),
  recruitmentController.unlockRecruitment,
);

module.exports = router;
