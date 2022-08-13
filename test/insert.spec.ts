/* eslint-disable max-len */
import {describe, test, expect} from 'vitest';
import {Insert} from '../src/class/Insert.js';

describe('Insert', () => {
	test('Execute with no arguments', () => (
		// @ts-ignore
		expect(() => new Insert()).toThrowError('title, recordedPath, encodePresetIdが指定されていません。')
	));

	test('Insert with invalid arguments', () => {
		expect(() => new Insert('test', 'test', Number.MAX_SAFE_INTEGER));
	});

	// いつかこれでエラー吐かせてみたい
	// test('Insert with invalid arguments', () => {
	// 	expect(() => new Insert('test', 'test', Number.MAX_SAFE_INTEGER));
	// });
});
