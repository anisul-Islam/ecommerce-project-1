import User from "../model/user.js";
import { comparePassword, hashPassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dev from "../config/index.js";
import { sendEmailWithNodeMailer } from "../helpers/email.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // if we have used 3rd party validator then no need to use to do the validation check
    // if (!name.trim()) {
    //   return res.json({
    //     error: "name is required",
    //   });
    // }

    // if (!email) {
    //   return res.json({
    //     error: "email is required",
    //   });
    // }

    // if (!password || password.length < 6) {
    //   return res.json({
    //     error: "Password must be atleast 6 characters",
    //   });
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "user already exist with this email",
      });
    }

    // create the user
    const hashedPassword = await hashPassword(password);

    // create signed jwt
    const token = jwt.sign(
      {
        name,
        email,
        password: hashedPassword,
        address,
      },
      String(dev.app.jwtAccountActivationKey),
      {
        expiresIn: "10m",
      }
    );

    // step 7: prepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2> Hello ${name} . </h2>
      <p> Please click here to <a href="${dev.app.clientUrl}/auth/activate/${token}">activate your account </a> </p>
     
      `, // html body
    };

    // step 8: send email
    sendEmailWithNodeMailer(emailData);

    return res.status(200).json({
      message: `Please go to your email: ${email} for completeting your registration process`,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const accountActivation = async (req, res) => {
  try {
    // step 1: get token from request body
    const { token } = req.body;

    // step 2: check token exist in request body
    if (token) {
      // step 3: verify token and decode data
      jwt.verify(
        token,
        String(dev.app.jwtAccountActivationKey),
        async (err, decoded) => {
          if (err) {
            return res.status(401).json({
              error: "Link has expired. Please signup again",
            });
          }

          const { name, email, password, address } = jwt.decode(token);

          // step 4: check user already exist or not
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return res.status(400).json({
              message: "user already exist with this email",
            });
          }

          // step 5: create user
          const newUser = new User({
            name,
            email,
            password,
            address,
          });

          // step 6: save user
          const userData = await newUser.save();

          // step 7: check user was saved or not
          if (!userData) {
            return res.status(400).send({
              message: "user was not created",
            });
          }

          return res.status(200).send({
            message: "user was created successfully ! Please signin",
          });
        }
      );
    } else {
      return res.status(400).send({
        message: "token not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "email is required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password must be atleast 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        error: "user does not exist with this email. please register first",
      });
    }

    const isPasswordMatched = await comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        error: "email/password did not match",
      });
    }

    // create signed jwt
    const token = jwt.sign(
      { _id: existingUser._id },
      String(dev.app.jwtSecretKey),
      {
        expiresIn: "40m",
      }
    );

    return res.json({
      message: "user was signed in",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        address: existingUser.address,
      },
      token,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
  } catch (error) {
    return res.json({ error: error.message });
  }
};
