import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


export class Insert {
	private date = new Date();
	private title: string;
	private recordedPath: string;
	private encodePresetId: number;

	constructor(title: string, recordedPath: string, encodePresetId: number) {
		if (title || recordedPath || encodePresetId) {
			this.title = title;
			this.recordedPath = recordedPath;
			this.encodePresetId = encodePresetId;
			this.main();
		} else {
			throw new Error('title, recordedPath, encodePresetIdが指定されていません。');
		}
	}

	private async main() {
		try {
			await this.putDB();
		} catch (error: any) {
			console.log;
			throw new Error(error);
		}
	}

	private async putDB() {
		await prisma.recordHistory.create({
			data: {
				title: this.title,
				recordedPath: this.recordedPath,
				recordingDateEnd: this.date,
				encodePresetId: this.encodePresetId,
			},
		});
		return;
	}
}
