const Cv = require('../models/Cv');
const Profile = require('../models/Profile');
const Recruitment = require('../models/Recruitment');
const convertString = require('../utils/convertString');

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
            message: 'Hồ sơ không tồn tại.',
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
            message: 'Bạn đã gửi hồ sơ đến nhà tuyển dụng này rồi.',
          });
        } else {
          const newCv = new Cv({
            profile: profile,
            recruitmentId: recruitmentId,
            recruitment: recruitment,
            writer,
            receiver,
            fullName: profile.fullName,
            keyName: convertString(profile.fullName),
            phoneNumber: profile.phoneNumber,
            email: profile.email,
            title: recruitment.title,
            keyTitle: recruitment.keyTitle,
            companyName: recruitment.companyName,
            keyCompany: recruitment.keyCompany,
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
                (err) => {
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
                message: 'Gửi hồ sơ ứng tuyển thành công.',
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

  // [GET] /cv
  // Lấy dữ liệu tất cả cv phía người gửi
  async getMyCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'candidate') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Cv.countDocuments({ writer: _id });
        const cv = await Cv.find({ writer: _id })
          .sort({ _id: -1 })
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

  // [GET] /cv/by-recruitment/:id
  // Lấy dữ liệu tất cả cv theo recruitmentId
  async getCvByRecruitmentId(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const PAGE_SIZE = 6;
        const page = parseInt(req.query.page || '0');
        const total = await Cv.countDocuments({
          receiver: _id,
          recruitmentId: req.params.id,
          failed: false,
        });
        const cv = await Cv.find({
          receiver: _id,
          recruitmentId: req.params.id,
          failed: false,
        })
          .sort({ _id: -1 })
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
            message: 'Tin tuyển dụng chưa nhận được cv nào.',
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

  // [GET] /cv/search-by-recruitment/:id
  // Tìm kiếm cv theo recruitmentId
  async getSearchCvByRecruitmentId(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const PAGE_SIZE = 6;
        const page = parseInt(req.query.page || '0');
        const key = decodeURI(req.query.key.trim());
        const total = await Cv.countDocuments({
          receiver: _id,
          recruitmentId: req.params.id,
          failed: false,
          $or: [
            { fullName: { $regex: new RegExp(key, 'i') } },
            { keyName: { $regex: new RegExp(key, 'i') } },
            { phoneNumber: { $regex: new RegExp(key, 'i') } },
            { email: { $regex: new RegExp(key, 'i') } },
          ],
        });
        const cv = await Cv.find({
          receiver: _id,
          recruitmentId: req.params.id,
          failed: false,
          $or: [
            { fullName: { $regex: new RegExp(key, 'i') } },
            { keyName: { $regex: new RegExp(key, 'i') } },
            { phoneNumber: { $regex: new RegExp(key, 'i') } },
            { email: { $regex: new RegExp(key, 'i') } },
          ],
        })
          .sort({ _id: -1 })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (cv.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách cv thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: cv.length,
            cv: cv,
            totalQuantity: total,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Không tìm thấy cv nào phù hợp.',
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
  // Lấy dữ liệu tất cả cv của tôi
  async getMyCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'candidate') {
        const PAGE_SIZE = 6;
        const page = parseInt(req.query.page || '0');
        const total = await Cv.countDocuments({
          writer: _id,
        });
        const cv = await Cv.find({
          writer: _id,
        })
          .sort({ _id: -1 })
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

  // [GET] /cv/search-my-cv
  // Tìm kiếm cv của tôi
  async getSearchMyCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'candidate') {
        const PAGE_SIZE = 6;
        const page = parseInt(req.query.page || '0');
        const key = decodeURI(req.query.key.trim());
        const total = await Cv.countDocuments({
          writer: _id,
          $or: [
            { title: { $regex: new RegExp(key, 'i') } },
            { keyTitle: { $regex: new RegExp(key, 'i') } },
            { companyName: { $regex: new RegExp(key, 'i') } },
            { keyCompany: { $regex: new RegExp(key, 'i') } },
          ],
        });
        const cv = await Cv.find({
          writer: _id,
          $or: [
            { title: { $regex: new RegExp(key, 'i') } },
            { keyTitle: { $regex: new RegExp(key, 'i') } },
            { companyName: { $regex: new RegExp(key, 'i') } },
            { keyCompany: { $regex: new RegExp(key, 'i') } },
          ],
        })
          .sort({ _id: -1 })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (cv.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách cv thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: cv.length,
            cv: cv,
            totalQuantity: total,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Không tìm thấy cv nào phù hợp.',
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

  // [GET] /cv/:id
  // Lấy dữ liệu cv theo id
  async getCvById(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const cv = await Cv.findOne({ _id: req.params.id, receiver: _id });
        if (!cv)
          return res.status(400).json({
            success: false,
            message: 'Cv không tồn tại hoặc đã bị xóa.',
          });
        return res.status(200).json({
          success: true,
          message: 'Lấy dữ liệu thành công.',
          cv: cv,
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

  // [PUT] /cv/browse-cv/:id
  // Duyệt cv
  async browseCv(req, res) {
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

  // [PUT] /cv/miss-cv/:id
  // Loại cv
  async missCv(req, res) {
    try {
      const { status, role, _id } = req.user;
      if (status && role === 'recruiter') {
        const cv = await Cv.findOne({ _id: req.params.id, receiver: _id });
        if (!cv)
          return res.status(400).json({
            success: false,
            message: 'Cv không tồn tại.',
          });
        cv.failed = true;
        await cv.save();
        return res.status(200).json({
          success: true,
          message: 'Cv đã bị loại.',
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
      if (status && role === 'candidate') {
        const deletedCv = await Cv.findOneAndDelete({
          _id: req.params.id,
          writer: _id,
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
