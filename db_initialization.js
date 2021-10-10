'use strict'

const config = require('./config/config.json');
const encode_settings = require('./config/encode_settings.json');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./rec_history.db");

db.run("CREATE TABLE IF NOT EXISTS `rec_history` (`rec_id` INTEGER PRIMARY KEY AUTOINCREMENT,`title` VARCHAR(255) NOT NULL,`recorded_path` VARCHAR(255) NOT NULL,`recording_date_end` DATETIME NOT NULL,`encode_preset_id` TINYINT NOT NULL,`is_encoded` TINYINT NOT NULL DEFAULT 0)")

db.close();