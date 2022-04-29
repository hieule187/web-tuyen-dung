const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const app = express();
const passport = require('passport');

app.use(passport.initialize());
require('../configs/passport');

router.post('/signup-candidate', accountController.signupCandidate);
router.post('/signup-recruiter', accountController.signupRecruiter);
router.post('/login', accountController.login);
router.get('/:id/verify/:verifyToken', accountController.verifyEmail);
router.post('/password-reset', accountController.passwordReset);
router.get(
  '/password-reset/:id/:verifyToken',
  accountController.verifyPasswordResetLink,
);
router.post(
  '/password-reset/:id/:verifyToken',
  accountController.resetPassword,
);
router.get(
  '/account-true',
  passport.authenticate('jwt', { session: false }),
  accountController.getTrueAccount,
);
router.get(
  '/account-false',
  passport.authenticate('jwt', { session: false }),
  accountController.getFalseAccount,
);
router.post(
  '/lock/:id',
  passport.authenticate('jwt', { session: false }),
  accountController.lockAccount,
);
router.post(
  '/unlock/:id',
  passport.authenticate('jwt', { session: false }),
  accountController.unLockAccount,
);
router.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  accountController.authenticatedAccount,
);

module.exports = router;
