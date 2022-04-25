const Profile = require('../models/Profile');

class ProfileController {
  // [POST] /profile/create
  // Tạo mới profile
  async createProfile(req, res) {
    try {
      const {
        fullName,
        birthday,
        phoneNumber,
        email,
        degree,
        experience,
        skill,
        target,
        gender,
      } = req.body;
      const newProfile = new Profile({
        fullName,
        birthday,
        phoneNumber,
        email,
        degree,
        experience,
        skill,
        target,
        gender,
        accountId: req.user._id,
      });
      const { role } = req.user;

      if (role === 'candidate') {
        const profile = await Profile.findOne({ accountId: req.user._id });
        if (profile)
          return res.status(400).json({
            success: false,
            message: 'Tài khoản này đã tạo hồ sơ.',
            existProfile: true,
          });

        await newProfile.save((err, result) => {
          if (err) {
            if (err.code === 11000) {
              return res.status(400).json({
                success: false,
                message: 'Email này đã được sử dụng để tạo hồ sơ.',
                existEmail: true,
              });
            }
            return res.status(400).json({
              success: false,
              message: 'Có lỗi khi tạo hồ sơ vui lòng kiểm tra lại thông tin.',
              err,
            });
          } else {
            res.status(200).json({
              success: true,
              message: 'Tạo hồ sơ thành công.',
              result,
            });
          }
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /profile
  // Lấy dữ liệu profile
  async getProfile(req, res) {
    try {
      const { role } = req.user;
      if (role === 'candidate') {
        const profile = await Profile.findOne({ accountId: req.user._id });
        if (!profile)
          return res.status(400).json({
            success: false,
            message: 'Tài khoản này chưa tạo hồ sơ.',
            existProfile: false,
          });

        return res.status(200).json({
          success: true,
          message: 'Lấy thông tin hồ sơ thành công.',
          existProfile: true,
          profile: profile,
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có quyền.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /profile/update
  // Cập nhật dữ liệu profile
  async updateProfile(req, res) {
    try {
      const {
        fullName,
        birthday,
        phoneNumber,
        email,
        degree,
        experience,
        skill,
        target,
        gender,
      } = req.body;
      let updatedProfile = {
        fullName,
        birthday,
        phoneNumber,
        email,
        degree,
        experience,
        skill,
        target,
        gender,
      };
      const { role } = req.user;

      if (role === 'candidate') {
        Profile.findOneAndUpdate(
          { accountId: req.user._id },
          updatedProfile,
          { new: true },
          (err, result) => {
            if (err) {
              if (err.code === 11000) {
                return res.status(400).json({
                  success: false,
                  message: 'Email này đã được sử dụng để tạo hồ sơ.',
                  existEmail: true,
                });
              }
              return res.status(400).json({
                success: false,
                message:
                  'Có lỗi khi cập nhật hồ sơ vui lòng kiểm tra lại thông tin.',
                err,
              });
            } else {
              res.status(200).json({
                success: true,
                message: 'Cập nhật hồ sơ thành công.',
                result,
              });
            }
          },
        );
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new ProfileController();
