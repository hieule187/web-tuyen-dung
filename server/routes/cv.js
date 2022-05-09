const express = require('express');
const router = express.Router();
const cvController = require('../controllers/CvController');
const app = express();
const passport = require('passport');

app.use(passport.initialize());
require('../configs/passport');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  cvController.createCv,
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  cvController.getMyCv,
);
router.get(
  '/by-recruitment/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.getCvByRecruitmentId,
);
router.get(
  '/cv-true',
  passport.authenticate('jwt', { session: false }),
  cvController.getTrueCv,
);
router.get(
  '/cv-false',
  passport.authenticate('jwt', { session: false }),
  cvController.getFalseCv,
);
router.put(
  '/browse-cv/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.browseCv,
);
router.put(
  '/miss-cv/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.missCv,
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.deleteCv,
);

module.exports = router;
