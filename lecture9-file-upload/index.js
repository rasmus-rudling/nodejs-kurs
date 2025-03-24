import express from "express";
import multer from "multer";

const app = express()
const port = 3000

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Ange uppladdningsmappen
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5 MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Ogiltig filtyp'));
        }
        cb(null, true);
    },
});

// Rutt för att ladda upp en fil
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Fil uppladdad:', req.file);
    res.send('Filen har laddats upp!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
