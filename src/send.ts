/* eslint-disable max-len */
import {PrismaClient, recordHistory} from '@prisma/client';
const prisma = new PrismaClient();
import {execa} from 'execa';
import config from './config/config.json' assert {type: 'json'};
import encodeSettings from './config/encode_settings.json';

import {postMisskey} from './postMisskey.js';

class Send {
	private records: recordHistory[] = [];
	private command: string = '';
	private message: string = '';

	constructor() {
		this.sendMain();
	}

	private async sendMain() {
		await this.getRecords();
		this.records.forEach(async (record) => {
			try {
				await this.sendRecord(record);
				this.message = `${this.records.length}件のエンコードを開始します。\n${this.records.map((record) => {
					return record.title;
				}).join('\n')}` as const;
			} catch (error) {
				this.message = `${error}` as const;
			}
			await this.sendMisskeyNotify();
		});
	}

	private async getRecords() {
		this.records = await prisma.recordHistory.findMany({
			where: {
				isEncoded: false,
			},
		});
	}

	private async sendRecord(record: recordHistory) {
		this.command = `"${config.AddTaskPath}" -r "${config.AmatsukazeRoot}" -f "${record.recordedPath}" -ip "${config.serverip}" -p ${config.port} -o "${config.saveFolder}" -s "${encodeSettings[record.encodePresetId]}" --priority 3 --no-move` as const;
		await execa(this.command);
	}

	private async sendMisskeyNotify() {
		try {
			await postMisskey(this.message);
		} catch (error) {
			console.log(error);
		}
	};
}

new Send();
