const Cv = require('../models/Cv');
const Profile = require('../models/Profile');
const Recruitment = require('../models/Recruitment');

class CvController {
  // [POST] /cv
  // Tạo mới cv
  async createCv(req, res) {
    try {
      const { profileId, recruitmentId, receiver } = req.body;
      const writer = req.user._id;
      const { status, role } = req.user;

      if (status && role === 'candidate') {
        const profile = await Profile.findOne({ _id: profileId });
        if (!profile)
          return res.status(400).json({
            success: false,
            message: 'Profile không tồn tại.',
          });

        const recruitment = await Recruitment.findOne({ _id: recruitmentId });
        if (!recruitment)
          return res.status(400).json({
            success: false,
            message: 'Tin tuyển dụng không tồn tại.',
          });

        const cv = await Cv.find({
          recruitmentId: recruitmentId,
          writer: writer,
        });
        if (cv.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Bạn đã gửi thông tin đến nhà tuyển dụng này rồi.',
          });
        } else {
          const newCv = new Cv({
            profile: profile,
            recruitmentId: recruitmentId,
            recruitment: recruitment,
            writer,
            receiver,
          });
          await newCv.save((err, result) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message:
                  'Có lỗi khi thêm dữ liệu, vui lòng kiểm tra lại thông tin.',
                err,
              });
            } else {
              Recruitment.updateOne(
                { _id: recruitmentId },
                { $push: { cv: newCv } },
                (err, cpl) => {
                  if (err) {
                    return res.status(400).json({
                      success: false,
                      message: 'Tin tuyển dụng không tồn tại.',
                    });
                  }
                },
              );
              return res.status(200).json({
                success: true,
                message: 'Gửi thông tin thành công',
                result,
              });
            }
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này hoặc đã bị khóa.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /cv/my-cv
  // Lấy dữ liệu tất cả cv phía người gửi
  async getMyCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'candidate') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Cv.countDocuments({ writer: _id });
        const cv = await Cv.find({ writer: _id })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (cv.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách cv thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: cv.length,
            cv: cv,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Bạn chưa gửi cv ứng tuyển nào.',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này hoặc đã bị khóa.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /cv/cv-true
  // Lấy dữ liệu tất cả cv đã duyệt qua phía người nhận
  async getTrueCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Cv.countDocuments({ receiver: _id, status: true });
        const cv = await Cv.find({ receiver: _id, status: true })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (cv.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách cv thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: cv.length,
            cv: cv,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Không có cv ứng tuyển nào.',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này hoặc đã bị khóa.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /cv/cv-false
  // Lấy dữ liệu tất cả cv chưa phê duyệt phía người nhận
  async getFalseCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Cv.countDocuments({ receiver: _id, status: false });
        const cv = await Cv.find({ receiver: _id, status: false })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (cv.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách cv thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: cv.length,
            cv: cv,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Không có cv ứng tuyển nào.',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này hoặc đã bị khóa.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /cv/:id
  // Duyệt cv
  async updateStatusCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const cv = await Cv.findOne({ _id: req.params.id, receiver: _id });
        if (!cv)
          return res.status(400).json({
            success: false,
            message: 'Cv không tồn tại.',
          });
        cv.status = true;
        await cv.save();
        return res.status(200).json({
          success: true,
          message: 'Cv đã được phê duyệt.',
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này hoặc đã bị khóa.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [DELETE] /cv/:id
  // Xóa cv
  async deleteCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const deletedCv = await Cv.findOneAndDelete({
          _id: req.params.id,
          receiver: _id,
        });

        if (!deletedCv)
          return res.status(400).json({
            success: false,
            message: 'Cv không tồn tại hoặc tài khoản không có quyền.',
          });
        return res.status(200).json({
          success: true,
          message: 'Xóa cv thành công.',
          cv: deletedCv,
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Tài khoản không có chức năng này hoặc đã bị khóa.',
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

module.exports = new CvController();
