import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get all users from DB
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'ERROR', cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(401).send('already registered user');
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 토큰 초기화
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    // 토큰 생성 및 전달
    const token = createToken(user._id.toString(), email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // add 7 days
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: 'OK', id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'ERROR', cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Cannot find the user');

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send('Wrong password');

    // 토큰 초기화
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    // 토큰 생성 및 전달
    const token = createToken(user._id.toString(), email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // add 7 days
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: 'OK', id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'ERROR', cause: error.message });
  }
};
