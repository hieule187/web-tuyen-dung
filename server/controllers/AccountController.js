const { Account, validate } = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VerifyToken = require('../models/VerifyToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

class AccountController {
  // [POST] /account/signup-candidate
  // Đăng ký tài khoản ứng viên
  async signupCandidate(req, res) {
    try {
      const { error } = validate({
        email: req.body.email,
        password: req.body.password,
      });
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      let account = await Account.findOne({ email: req.body.email });
      if (account)
        return res.status(409).json({
          success: false,
          message: 'Địa chỉ email đã được sử dụng.',
        });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      account = await new Account({
        ...req.body,
        password: hashPassword,
        role: 'candidate',
      }).save();

      const verifyToken = await new VerifyToken({
        accountId: account._id,
        verifyToken: crypto.randomBytes(32).toString('hex'),
      }).save();

      const url = `${process.env.BASE_URL}/account/${account._id}/verify/${verifyToken.verifyToken}`;
      await sendEmail(
        account.email,
        'Xác Minh Email',
        `<a href="${url}">Nhấn vào đây để xác minh tài khoản của bạn.</a>`,
      );

      res.status(200).json({
        success: true,
        message: 'Email đã được gửi đến hộp thư của bạn, vui lòng xác minh.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /account/signup-recruiter
  // Đăng ký tài khoản nhà tuyển dụng
  async signupRecruiter(req, res) {
    try {
      const { error } = validate({
        email: req.body.email,
        password: req.body.password,
      });
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      let account = await Account.findOne({ email: req.body.email });
      if (account)
        return res.status(409).json({
          success: false,
          message: 'Địa chỉ email đã được sử dụng.',
        });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      account = await new Account({
        ...req.body,
        password: hashPassword,
        role: 'recruiter',
      }).save();

      const verifyToken = await new VerifyToken({
        accountId: account._id,
        verifyToken: crypto.randomBytes(32).toString('hex'),
      }).save();

      const url = `${process.env.BASE_URL}/account/${account._id}/verify/${verifyToken.verifyToken}`;
      await sendEmail(
        account.email,
        'Xác Minh Email',
        `<a href="${url}">Nhấn vào đây để xác minh tài khoản của bạn.</a>`,
      );

      res.status(200).json({
        success: true,
        message: 'Email đã được gửi đến hộp thư của bạn, vui lòng xác minh.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /account/login
  // Đăng nhập
  async login(req, res) {
    try {
      const { error } = validate({
        email: req.body.email,
        password: req.body.password,
      });
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      const account = await Account.findOne({ email: req.body.email });
      if (!account)
        return res.status(401).json({
          success: false,
          message: 'Địa chỉ email hoặc mật khẩu không đúng.',
        });

      const validPassword = await bcrypt.compare(
        req.body.password,
        account.password,
      );
      if (!validPassword)
        return res.status(401).json({
          success: false,
          message: 'Địa chỉ email hoặc mật khẩu không đúng.',
        });

      if (!account.verified) {
        let verifyToken = await VerifyToken.findOne({ accountId: account._id });
        if (!verifyToken) {
          verifyToken = await new VerifyToken({
            accountId: account._id,
            verifyToken: crypto.randomBytes(32).toString('hex'),
          }).save();

          const url = `${process.env.BASE_URL}/account/${account._id}/verify/${verifyToken.verifyToken}`;
          await sendEmail(
            account.email,
            'Xác Minh Email',
            `<a href="${url}">Nhấn vào đây để xác minh tài khoản của bạn.</a>`,
          );
        }
        return res.status(400).json({
          success: false,
          message: 'Email đã được gửi đến hộp thư của bạn, vui lòng xác minh.',
        });
      }

      const payload = {
        fullName: account.fullName,
        sub: account._id,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
        expiresIn: '3d',
      });

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công.',
        accessToken: 'Bearer ' + accessToken,
        account: {
          _id: account._id,
          fullName: account.fullName,
          email: account.email,
          role: account.role,
          status: account.status,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /account/:id/verify/:verifyToken
  // Xác minh email
  async verifyEmail(req, res) {
    try {
      const account = await Account.findOne({ _id: req.params.id });
      if (!account)
        return res.status(400).json({
          success: false,
          message: 'Đường dẫn không hợp lệ.',
        });

      const verifyToken = await VerifyToken.findOne({
        accountId: account._id,
        verifyToken: req.params.verifyToken,
      });
      if (!verifyToken)
        return res.status(400).json({
          success: false,
          message: 'Đường dẫn không hợp lệ.',
        });

      await Account.updateOne(
        { _id: account._id },
        { $set: { verified: true } },
      );
      await verifyToken.remove();

      res.status(200).json({
        success: true,
        message: 'Xác thực email thành công.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /account/password-reset
  // Gửi link reset mật khẩu
  async passwordReset(req, res) {
    try {
      const emailSchema = Joi.object({
        email: Joi.string().email().required().label('Email'),
      });
      const { error } = emailSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      let account = await Account.findOne({ email: req.body.email });
      if (!account)
        return res.status(409).json({
          success: false,
          message: 'Email không tồn tại trên hệ thống, vui lòng kiểm tra lại.',
        });

      let verifyToken = await VerifyToken.findOne({ accountId: account._id });
      if (!verifyToken)
        verifyToken = await new VerifyToken({
          accountId: account._id,
          verifyToken: crypto.randomBytes(32).toString('hex'),
        }).save();

      const url = `${process.env.BASE_URL}/account/password-reset/${account._id}/${verifyToken.verifyToken}`;
      await sendEmail(
        account.email,
        'Reset Mật Khẩu',
        `<a href="${url}">Nhấn vào đây để reset mật khẩu của bạn.</a>`,
      );

      res.status(200).json({
        success: true,
        message:
          'Kiểm tra hộp thư của bạn sau đó nhấn vào đường dẫn để thay đổi mật khẩu.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /account/password-reset/:id/:verifyToken
  // Xác minh link đổi mật khẩu có hợp lệ hay không
  async verifyPasswordResetLink(req, res) {
    try {
      const account = await Account.findOne({ _id: req.params.id });
      if (!account)
        return res.status(400).json({
          success: false,
          message: 'Đường dẫn không hợp lệ.',
        });

      const verifyToken = await VerifyToken.findOne({
        accountId: account._id,
        verifyToken: req.params.verifyToken,
      });
      if (!verifyToken)
        return res.status(400).json({
          success: false,
          message: 'Đường dẫn không hợp lệ.',
        });

      res.status(200).json({
        success: true,
        message: 'Đường dẫn hợp lệ.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /account/password-reset/:id/:verifyToken
  // Thực hiện thay đổi mật khẩu
  async resetPassword(req, res) {
    try {
      const passwordSchema = Joi.object({
        password: passwordComplexity().required().label('Password'),
      });
      const { error } = passwordSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });

      const account = await Account.findOne({ _id: req.params.id });
      if (!account)
        return res.status(400).json({
          success: false,
          message: 'Đường dẫn không hợp lệ.',
        });

      const verifyToken = await VerifyToken.findOne({
        accountId: account._id,
        verifyToken: req.params.verifyToken,
      });
      if (!verifyToken)
        return res.status(400).json({
          success: false,
          message: 'Đường dẫn không hợp lệ.',
        });

      if (!account.verified) account.verified = true;

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      account.password = hashPassword;
      await account.save();
      await verifyToken.remove();

      res.status(200).json({
        success: true,
        message: 'Thay đổi mật khẩu thành công.',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [GET] /account/account-true
  // Lấy dữ liệu tất cả tài khoản không bị khóa
  async getTrueAccount(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Account.countDocuments({ status: true });
        const account = await Account.find({ status: true })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (account.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách tài khoản thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: account.length,
            account: account,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Hiện tất cả tài khoản đều bị khóa.',
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

  // [GET] /account/account-false
  // Lấy dữ liệu tất cả tài khoản bị khóa
  async getFalseAccount(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const PAGE_SIZE = 5;
        const page = parseInt(req.query.page || '0');
        const total = await Account.countDocuments({ status: false });
        const account = await Account.find({ status: false })
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * page);
        if (account.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'Load danh sách tài khoản thành công.',
            totalPages: Math.ceil(total / PAGE_SIZE),
            quantity: account.length,
            account: account,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Hiện chưa có tài khoản nào bị khóa.',
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

  // [POST] /account/lock/:id
  // Khóa tài khoản
  async lockAccount(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const account = await Account.findOne({ _id: req.params.id });
        if (!account)
          return res.status(400).json({
            success: false,
            message: 'Tài khoản không tồn tại.',
          });
        account.status = false;
        await account.save();
        return res.status(200).json({
          success: true,
          message: 'Đã khóa tài khoản.',
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

  // [POST] /account/unlock/:id
  // Khóa tài khoản
  async unLockAccount(req, res) {
    try {
      const { status, role } = req.user;
      if (status && role === 'admin') {
        const account = await Account.findOne({ _id: req.params.id });
        if (!account)
          return res.status(400).json({
            success: false,
            message: 'Tài khoản không tồn tại.',
          });
        account.status = true;
        await account.save();
        return res.status(200).json({
          success: true,
          message: 'Đã mở khóa tài khoản.',
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

module.exports = new AccountController();
