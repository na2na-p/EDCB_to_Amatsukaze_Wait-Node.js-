/* eslint-disable max-len */
/* eslint-disable camelcase */
import {PrismaClient, recordHistory} from '@prisma/client';
const prisma = new PrismaClient();
import config from './config/config.json';
import encodeSettings from './config/encode_settings.json';

class Send {
	private records: recordHistory[] = [];
	private command: string = '';

	constructor() {
		this.sendMain();
	}

	private async sendMain() {
		await this.getRecords();
		this.records.forEach(async (record) => {
			try {
				await this.sendRecord(record);
			} catch (error) {
			}
		});
	}

	private async getRecords() {
		this.records = await prisma.recordHistory.findMany();
	}

	private async sendRecord(record: recordHistory) {
		this.command = `"${config.AddTaskPath}" -r "${config.AmatsukazeRoot}" -f "${record.recordedPath}" -ip "${config.serverip}" -p ${config.port} -o "${config.saveFolder}" -s "${encodeSettings[record.encodePresetId]}" --priority 3 --no-move` as const;
	}

	private async sendMisskeyNotify() {

	};
}
