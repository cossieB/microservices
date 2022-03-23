import express from 'express';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv'
dotenv.config()

const mailgun = new Mailgun(FormData);
const MAILGUN_KEY = process.env['MAILGUN_KEY']
const mg = mailgun.client({username: 'api', key: MAILGUN_KEY || 'key-yourkeyhere'});
const PUBKEY = process.env['MAILGUN_PUBKEY']
export const emailRouter = express.Router()

const DOMAIN = 'sandboxab001f3c9ee145d6a145546df2d5338f.mailgun.org';

emailRouter.post('/', async (req, res) => {
  const {name, company, email, msg} = req.body;
  const data = {
    from: 'Cossie Bot <postmaster@sandboxab001f3c9ee145d6a145546df2d5338f.mailgun.org>',
    to: process.env.EMAIL,
    subject: `${name} - ${company}`,
    html: `<div style="text-align: center"><h1>${company}</h1><h2>${name}</h2><h2>{${email}</h2><p>${msg}</p></div>`
  };
  try {
    await mg.messages.create(DOMAIN, data);
    res.status(201).json({status: "success"})
  }
  catch(e: any) {
    console.log(e);
    res.status(500).json({error: e.message})
  }
})

