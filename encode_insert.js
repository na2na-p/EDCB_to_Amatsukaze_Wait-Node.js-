'use strict'

const config = require('./config/config.json');
const encode_settings = require('./config/encode_settings.json');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./rec_history.db");
const date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });

const title = process.argv[2];
const recorded_path = process.argv[3];
const encode_preset_id = process.argv[4];


const encode_preset = encode_settings[0].name;

console.log(date);
console.log(title);
console.log(recorded_path);
console.log(encode_preset_id);

db.serialize(() => {
    db.run("insert into rec_history(title, recorded_path, recording_date_end, encode_preset_id) values(?,?,?,?)", title, recorded_path, date, encode_preset_id);
});

