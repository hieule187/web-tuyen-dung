const Recruitment = require('../models/Recruitment');
const fs = require('fs');
const convertString = require('../utils/convertString');

class RecruitmentController {
  // [POST] /recruitment
  // Tạo mới tin tuyển dụng
  async createRecruitment(req, res) {
    try {
      const {
        companyName,
        title,
        deadline,
        description,
        salary,
        workingForm,
        quantity,
        level,
        experience,
        gender,
        location,
        career,
        address,
      } = req.body;

      const img = req.file ? req.file.path : 'uploads\\tuyen-dung.png';
      const writer = req.user._id;
      const { status, role } = req.user;

      if (status && role === 'recruiter') {
        const recruitment = await Recruitment.find({
          writer: writer,
          status: false,
        });
        if (recruitment.length >= 1) {
          res.status(400).json({
            success: false,
            message:
              'Bạn có tin tuyển dụng chưa được phê duyệt, vui lòng chờ quá trình phê duyệt hoàn tất.',
            browse: false,
          });
        } else {
          const newRecruitment = new Recruitment({
            companyName,
            title,
            img,
            deadline,
            description,
            salary,
            workingForm,
            quantity,
            level,
            experience,
            gender,
            location,
            career,
            address,
            writer,
            keyTitle: convertString(title),
            keyCompany: convertString(companyName),
            keyLocation: convertString(location),
            keyCareer: convertString(career),
          });
          await newRecruitment.save((err, result) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message:
                  'Có lỗi khi thêm dữ liệu, vui lòng kiểm tra lại thông tin.',
                err,
              });
            }
            return res.status(200).json({
              success: true,
              message: 'Tạo tin tuyển dụng thành công.',
              result,
            });
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

  // [GET] /recruitment
  // Lấy dữ liệu tất cả tin tuyển dụng
  async getRecruitment(req, res) {
    try {
      const PAGE_SIZE = 12;
      const page = parseInt(req.query.page || '0');
      const total = await Recruitment.countDocuments({
        status: true,
        display: true,
      });
      const recruitment = await Recruitment.find({
        status: true,
        display: true,
      })
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      if (recruitment.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Load danh sách tin tuyển dụng thành công.',
          totalPages: Math.ceil(total / PAGE_SIZE),
          quantity: recruitment.length,
          recruitment: recruitment,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Hiện chưa có tin tuyển dụng nào được phê duyệt.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /recruitment/my-recruitment
  // Lấy dữ liệu tin tuyển dụng của tôi
  async getMyRecruitment(req, res) {
    try {
      const PAGE_SIZE = 6;
      const page = parseInt(req.query.page || '0');
      const total = await Recruitment.countDocuments({ writer: req.user._id });
      const recruitment = await Recruitment.find({ writer: req.user._id })
        .populate('cv', ['profile'])
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      if (recruitment.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Load danh sách tin tuyển dụng thành công.',
          totalPages: Math.ceil(total / PAGE_SIZE),
          quantity: recruitment.length,
          recruitment: recruitment,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Bạn chưa đăng tin tuyển dụng nào.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /recruitment/search-my-recruitment
  // Tìm kiếm trong tin tuyển dụng của tôi
  async getSearchMyRecruitment(req, res) {
    try {
      const PAGE_SIZE = 6;
      const page = parseInt(req.query.page || '0');
      const key = decodeURI(req.query.key.trim());
      const total = await Recruitment.countDocuments({
        writer: req.user._id,
        $or: [
          { title: { $regex: new RegExp(key, 'i') } },
          { keyTitle: { $regex: new RegExp(key, 'i') } },
        ],
      });
      const recruitment = await Recruitment.find({
        writer: req.user._id,
        $or: [
          { title: { $regex: new RegExp(key, 'i') } },
          { keyTitle: { $regex: new RegExp(key, 'i') } },
        ],
      })
        .populate('cv', ['profile'])
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      if (recruitment.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Load danh sách tin tuyển dụng thành công.',
          totalPages: Math.ceil(total / PAGE_SIZE),
          quantity: recruitment.length,
          recruitment: recruitment,
          totalQuantity: total,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Không tìm thấy tin tuyển dụng nào.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /recruitment/:id
  // Lấy dữ liệu tin tuyển dụng theo id
  async getRecruitmentById(req, res) {
    try {
      const recruitment = await Recruitment.findOne({ _id: req.params.id });
      if (!recruitment)
        return res.status(400).json({
          success: false,
          message: 'Tin tuyển dụng không tồn tại hoặc đã bị xóa.',
        });
      return res.status(200).json({
        success: true,
        message: 'Lấy dữ liệu thành công.',
        recruitment: recruitment,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [PUT] /recruitment/:id
  // Cập nhật tin tuyển dụng theo id
  async updateRecruitment(req, res) {
    try {
      const {
        companyName,
        title,
        deadline,
        description,
        salary,
        workingForm,
        quantity,
        level,
        experience,
        gender,
        location,
        career,
        address,
      } = req.body;

      const writer = req.user._id;
      const { status, role } = req.user;
      let updatedRecruitment = {
        companyName,
        title,
        deadline,
        description,
        salary,
        workingForm,
        quantity,
        level,
        experience,
        gender,
        location,
        career,
        address,
        status: false,
        keyTitle: convertString(title),
        keyCompany: convertString(companyName),
        keyLocation: convertString(location),
        keyCareer: convertString(career),
      };

      if (status && role === 'recruiter') {
        updatedRecruitment = await Recruitment.findOneAndUpdate(
          { _id: req.params.id, writer: writer },
          updatedRecruitment,
          { new: true },
        );

        if (!updatedRecruitment)
          return res.status(400).json({
            success: false,
            message:
              'Tin tuyển dụng không tồn tại hoặc tài khoản không có quyền.',
          });

        return res.status(200).json({
          success: true,
          message: 'Cập nhật tin tuyển dụng thành công.',
          recruitment: updatedRecruitment,
        });
      } else if (status && role === 'admin') {
        updatedRecruitment = await Recruitment.findOneAndUpdate(
          { _id: req.params.id },
          updatedRecruitment,
          { new: true },
        );

        if (!updatedRecruitment)
          return res.status(400).json({
            success: false,
            message:
              'Tin tuyển dụng không tồn tại hoặc tài khoản không có quyền.',
          });

        return res.status(200).json({
          success: true,
          message: 'Cập nhật tin tuyển dụng thành công.',
          recruitment: updatedRecruitment,
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

  // [DELETE] /recruitment/:id
  // Xóa tin tuyển dụng theo id
  async deleteRecruitment(req, res) {
    try {
      const writer = req.user._id;
      const { status, role } = req.user;

      if (status && role === 'recruiter') {
        const deletedRecruitment = await Recruitment.findOneAndDelete({
          _id: req.params.id,
          writer: writer,
        });

        if (!deletedRecruitment)
          return res.status(400).json({
            success: false,
            message:
              'Tin tuyển dụng không tồn tại hoặc tài khoản không có quyền.',
          });

        if (deletedRecruitment.img !== 'uploads\\tuyen-dung.png') {
          fs.unlink(deletedRecruitment.img, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Xóa tin tuyển dụng thành công.',
          recruitment: deletedRecruitment,
        });
      } else if (status && role === 'admin') {
        const deletedRecruitment = await Recruitment.findOneAndDelete({
          _id: req.params.id,
        });

        if (!deletedRecruitment)
          return res.status(400).json({
            success: false,
            message:
              'Tin tuyển dụng không tồn tại hoặc tài khoản không có quyền.',
          });

        if (deletedRecruitment.img !== 'uploads\\tuyen-dung.png') {
          fs.unlink(deletedRecruitment.img, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Xóa tin tuyển dụng thành công.',
          recruitment: deletedRecruitment,
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

  // [POST] /recruitment/search
  // Tìm kiếm tin tuyển dụng
  async searchRecruitment(req, res) {
    try {
      const { keyWord } = req.body;
      const searchedRecruitment = await Recruitment.find({
        $text: { $search: keyWord },
        status: true,
      });

      if (searchedRecruitment.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Lấy dữ liệu thành công.',
          recruitment: searchedRecruitment,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Không tìm thấy dữ liệu phù hợp.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /recruitment/quick-search
  // Tìm kiếm nhanh tin tuyển dụng
  async quickSearchRecruitment(req, res) {
    try {
      const { location, career } = req.body;
      const searchedRecruitment = await Recruitment.find({
        location: location,
        career: career,
      });

      if (searchedRecruitment.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Lấy dữ liệu thành công.',
          recruitment: searchedRecruitment,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Không tìm thấy dữ liệu phù hợp.',
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [PUT] /browse-recruitment/:id
  // Duyệt tin tuyển dụng
  async browseRecruitment(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const recruitment = await Recruitment.findOne({ _id: req.params.id });
        if (!recruitment)
          return res.status(400).json({
            success: false,
            message: 'Tin tuyển dụng không tồn tại.',
          });
        recruitment.status = true;
        await recruitment.save();
        return res.status(200).json({
          success: true,
          message: 'Tin tuyển dụng đã được phê duyệt.',
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

  // [PUT] /miss-recruitment/:id
  // Khóa tin tuyển dụng
  async missRecruitment(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const recruitment = await Recruitment.findOne({ _id: req.params.id });
        if (!recruitment)
          return res.status(400).json({
            success: false,
            message: 'Tin tuyển dụng không tồn tại.',
          });
        recruitment.status = false;
        await recruitment.save();
        return res.status(200).json({
          success: true,
          message: 'Đã khóa tin tuyển dụng.',
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

  // [GET] /recruitment/recruitment-true
  // Lấy dữ liệu tất cả tin tuyển dụng đã duyệt qua
  async getTrueRecruitment(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Recruitment.countDocuments({ status: true });
        const recruitment = await Recruitment.find({ status: true })
          .sort({ _id: -1 })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (recruitment.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách tin tuyển dụng thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: recruitment.length,
            recruitment: recruitment,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Hiện chưa có tin tuyển dụng nào được phê duyệt.',
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

  // [GET] /recruitment/recruitment-false
  // Lấy dữ liệu tất cả tin tuyển dụng chưa được phê duyệt
  async getFalseRecruitment(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Recruitment.countDocuments({ status: false });
        const recruitment = await Recruitment.find({ status: false })
          .sort({ _id: -1 })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (recruitment.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách tin tuyển dụng thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: recruitment.length,
            recruitment: recruitment,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Hiện tất cả các tin tuyển dụng đã được phê duyệt.',
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

  // [PUT] /lock-recruitment/:id
  // Khóa hiển thị tin tuyển dụng role nhà tuyển dụng
  async lockRecruitment(req, res) {
    try {
      const writer = req.user._id;
      const { status, role } = req.user;
      if (status && role === 'recruiter') {
        const recruitment = await Recruitment.findOne({
          _id: req.params.id,
          writer: writer,
        });
        if (!recruitment)
          return res.status(400).json({
            success: false,
            message: 'Tin tuyển dụng không tồn tại.',
          });
        recruitment.display = false;
        await recruitment.save();
        return res.status(200).json({
          success: true,
          message: 'Đã khóa hiển thị tin tuyển dụng.',
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

  // [PUT] /unlock-recruitment/:id
  // Khóa hiển thị tin tuyển dụng role nhà tuyển dụng
  async unlockRecruitment(req, res) {
    try {
      const writer = req.user._id;
      const { status, role } = req.user;
      if (status && role === 'recruiter') {
        const recruitment = await Recruitment.findOne({
          _id: req.params.id,
          writer: writer,
        });
        if (!recruitment)
          return res.status(400).json({
            success: false,
            message: 'Tin tuyển dụng không tồn tại.',
          });
        recruitment.display = true;
        await recruitment.save();
        return res.status(200).json({
          success: true,
          message: 'Đã mở hiển thị tin tuyển dụng.',
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

module.exports = new RecruitmentController();
