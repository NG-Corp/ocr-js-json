const express = require("express")
const app = express();
const fs = require('fs');
const multer = require('multer');
const { createWorker, createScheduler } = require('tesseract.js');
const xlsx = require('xlsx');
const path = require('path');
const txtToJson = require('txt-to-json')


const scheduler = createScheduler();
const worker = createWorker();
const worker2 = createWorker();




// Data
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }

});
const upload = multer({ storage: storage }).single("avatar");

// Routes
app.set( "view engine", "ejs" );


app.get("/", (req, res) => {
    res.render("index")
})

const api = (data1) => {
app.post("/upload", (req, res) => {
    upload(req, res, err => {
        fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
                if (err)
                    return console.log("Error!", err);

                    (async () => {
                        await worker.load();
                        await worker.loadLanguage('eng');
                        await worker.initialize('eng');
                        const { data: { text } } = await worker.recognize(data1);
                        console.log(text);
                        await fs.writeFile(`${data1}.txt`, text, (err) => {}); // 4
                        await txtToJson(`./${data1}.txt`)
                        await worker.terminate();   
 
                      })();
            });
        });
    });
};

module.exports = api;

// Server 
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => console.log('Port 5000 open localhost:6000'));

