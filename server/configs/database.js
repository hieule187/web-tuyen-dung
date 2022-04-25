const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log('Kết nối tới database thành công!');
  } catch (error) {
    console.log(error);
    console.log('Không thể kết nối tới database!');
  }
};
