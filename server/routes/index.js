const accountRouter = require('./account');
const profileRouter = require('./profile');
const recruitmentRouter = require('./recruitment');
const cvRouter = require('./cv');

module.exports = (app) => {
  app.use('/api/account', accountRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/recruitment', recruitmentRouter);
  app.use('/api/cv', cvRouter);
};
