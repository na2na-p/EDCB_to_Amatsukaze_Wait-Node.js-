/* eslint-disable  */
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


class Insert {
	private date = new Date();
  private title: string;
  private recordedPath: string;
  private encodePresetId: number;

  constructor(title: string, recordedPath: string, encodePresetId: number) {
    this.title = title;
    this.recordedPath = recordedPath;
    this.encodePresetId = encodePresetId;
		prisma.recordHistory.create({
			data: {
				title: this.title,
				recordedPath: this.recordedPath,
				recordingDateEnd: this.date,
				encodePresetId: this.encodePresetId,
			}
		})
  }
}

new Insert(process.argv[2], process.argv[3], parseInt(process.argv[4]));
