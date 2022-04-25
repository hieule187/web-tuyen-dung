const express = require('express');
const router = express.Router();
const profileController = require('../controllers/ProfileController');
const app = express();
const passport = require('passport');

app.use(passport.initialize());
require('../configs/passport');

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  profileController.createProfile,
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.getProfile,
);
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  profileController.updateProfile,
);

module.exports = router;
