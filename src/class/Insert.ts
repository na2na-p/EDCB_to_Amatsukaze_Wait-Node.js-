/* eslint-disable  */
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
			try {
				prisma.recordHistory.create({
					data: {
						title: this.title,
						recordedPath: this.recordedPath,
						recordingDateEnd: this.date,
						encodePresetId: this.encodePresetId,
					}
				});
				return;
			} catch (error: any) {
				throw new Error(error);
			}
		} else {
			throw new Error('title, recordedPath, encodePresetIdが指定されていません。');
		}
  }
}
