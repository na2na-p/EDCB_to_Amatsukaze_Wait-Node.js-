/* eslint-disable max-len */
import {PrismaClient, recordHistory} from '@prisma/client';
const prisma = new PrismaClient();
import {execa} from 'execa';
import {generalConfig, encodePreset} from '../config/config.js';

import {postMisskey} from '../postMisskey.js';

export class Send {
	private records: recordHistory[] = [];
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
						this.sendRecord(record).then(() => {
							this.succeedRecordIds.push(record.recId);
						});
					} catch (error) {
					}
				});
				this.message = `${this.records.length}件のエンコードを開始します。\n${this.records.map((record) => {
					return `- ${record.title}\n`;
				}).join('\n')}` as const;
			} catch (error) {
				this.message = `${error}` as const;
			}
			this.updateRecords().then(() => {
				this.sendMisskeyNotify(); // 待たなくていいのでawait無し
			});
		}
	}

	private async getRecords() {
		this.records = await prisma.recordHistory.findMany({
			where: {
				isEncoded: false,
			},
		});
	}

	private async sendRecord(record: recordHistory) {
		const command = ['-r', `${generalConfig.AmatsukazeRoot}`, '-f', `${record.recordedPath}`, '-ip', `${generalConfig.serverIp}`, '-p', `${generalConfig.port}`, '-o', `${generalConfig.saveFolder}`, '-s', `${encodePreset[record.encodePresetId]}`, '--priority', '3', '--no-move'] as const;
		console.log(command);
		const {stdout} = await execa(`"${generalConfig.AddTaskPath}"`, command);
		// stdoutをSHIFT-JISからUTF-8に変換
		const stdoutUtf8 = stdout.replace(/[\u0080-\u00ff]/g, (c) => {
			return String.fromCharCode(c.charCodeAt(0) - 0x80);
		}).replace(/\r\n/g, '\n');
		console.log(stdoutUtf8);
	}

	private async sendMisskeyNotify() {
		try {
			await postMisskey(this.message);
		} catch (error) {
			console.log(error);
		}
	};

	private async updateRecords() {
		console.log(this.succeedRecordIds);
		const recs = await prisma.recordHistory.updateMany({
			where: {
				recId: {
					in: this.succeedRecordIds,
				},
			},
			data: {
				isEncoded: true,
			},
		});
		console.log(recs);
	}
}
