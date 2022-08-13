import {describe, test, expect} from 'vitest';
import {postMisskey} from '../src/postMisskey.js';


describe('post Misskey', () => {
	test('Expected behavior', async () => (
		expect(await postMisskey('test')).toBe(404) // mock謎
	));
});

globalThis.resetBeforeEachTest = true;
