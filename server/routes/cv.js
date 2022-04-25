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
  '/my-cv',
  passport.authenticate('jwt', { session: false }),
  cvController.getMyCv,
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
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.updateStatusCv,
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cvController.deleteCv,
);

module.exports = router;
