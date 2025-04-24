import multer from 'multer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
export const upload = multer({ storage });
