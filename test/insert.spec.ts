/* eslint-disable max-len */
import {describe, test, expect} from 'vitest';
import {Insert} from '../src/class/Insert.js';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

describe('Insert', () => {
	test('Execute with no arguments', () => (
		// @ts-ignore
		expect(() => new Insert()).toThrowError('title, recordedPath, encodePresetIdが指定されていません。')
	));

	// test('Insert with invalid arguments', () => {
	// 	expect(async () => new Insert('test', 'test', Number.MAX_SAFE_INTEGER));
	// });

	test('Actual Behavior', async () => {
		new Insert('test', 'test', 1);
		const records = await prisma.recordHistory.findMany();
		expect(records.length).toBe(1);
	});

	// いつかこれでエラー吐かせてみたい
	// test('Insert with invalid arguments', () => {
	// 	expect(() => new Insert('test', 'test', Number.MAX_SAFE_INTEGER));
	// });
});
