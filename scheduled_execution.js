'use strict'

const config = require('./config/config.json');
const execSync = require('child_process').execSync
const encode_settings = require('./config/encode_settings.json');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./rec_history.db");
const date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
let encode_preset = null;


//これで全件取得できそう
db.all("select * from rec_history where is_encoded == 0", (err, rows) => {
    for (let index = 0; index < rows.length; index++) {
        encode_preset = rows[index].encode_preset_id;
        encode_preset = encode_settings[encode_preset];
        let send = (execSync("\"" + config[0].Addtask_path + "\" -r \"" + config[0].Amatsukaze_root + "\" -f \"" + rows[index].recorded_path + "\" -ip \"" + config[0].serverip + "\" -p " + config[0].port + " -o \"" + config[0].saveFolder + "\" -s \"" + encode_preset.name + "\" --priority 3 --no-move"));
        console.log("ok");
    }
});
db.run("UPDATE rec_history SET is_encoded = 1 WHERE is_encoded == 0");
/*
db.all("select * from rec_history", (err, rows) => {
    console.log(rows)
});
*/

const toString = (bytes) => {
    return Encoding.convert(bytes, {
        from: 'SJIS',
        to: 'UNICODE',
        type: 'string',
    });
};