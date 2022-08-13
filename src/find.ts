import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

async function getRecords() {
	const records = await prisma.recordHistory.findMany({
		where: {
			isEncoded: false,
		},
	});
	return records;
}

console.log(await getRecords());
