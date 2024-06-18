import { Request } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    console.log('pase');

    cb(null, './public/uploads')
  },
  filename: function (req: Request, file, cb) {
    console.log('Saving file as:', `${uuidv4()}${path.extname(file.originalname)}`);
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
  }
})


export const upload = multer({ storage })
