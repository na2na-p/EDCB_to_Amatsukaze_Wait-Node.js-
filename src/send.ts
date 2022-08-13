/* eslint-disable max-len */
import {PrismaClient, recordHistory} from '@prisma/client';
const prisma = new PrismaClient();
import {execa} from 'execa';
import config from './config/config.json' assert {type: 'json'};
import encodeSettings from './config/encode_settings.json' assert {type: 'json'};

import {postMisskey} from './postMisskey.js';

class Send {
	private records: recordHistory[] = [];
	private command: string = '';
	private message: string = '';
	private succeedRecordIds: number[] = [];

	constructor() {
		this.sendMain();
	}

	private async sendMain() {
		await this.getRecords();
		if (this.records.length === 0) {
			this.message = 'エンコードする録画がありません。';
		} else {
			try {
				this.records.forEach(async (record) => {
					try {
						await this.sendRecord(record);
						this.succeedRecordIds.push(record.recId);
					} catch (error) {
					}
				});
				this.message = `${this.records.length}件のエンコードを開始します。\n${this.records.map((record) => {
					return record.title;
				}).join('\n')}` as const;
			} catch (error) {
				this.message = `${error}` as const;
			}
			this.updateRecords(); // 待たなくていいのでawait無し
		}
		this.sendMisskeyNotify(); // 同上
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

	private async updateRecords() {
		await prisma.recordHistory.updateMany({
			where: {
				recId: {
					in: this.succeedRecordIds,
				},
			},
			data: {
				isEncoded: true,
			},
		});
	}
}

new Send();
