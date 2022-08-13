import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

async function getRecords() {
	const records = await prisma.recordHistory.findMany({
		where: {
			isEncoded: false,
		},
	});
	if (records.length === 0) {
		return 'エンコード待ちはありません。';
	}
	return records;
}

console.log(await getRecords());
