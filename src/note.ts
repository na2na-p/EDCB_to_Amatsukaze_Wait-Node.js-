import {postMisskey} from './postMisskey.js';
const records = [
	{
		title: 'test1',
	},
	{
		title: 'test2',
	},
	{
		title: 'test3',
	},
];

const message = (() => {
	return `${records.length}件のエンコードを開始します。\n${records.map((record) => {
		return record.title;
	}).join('\n')}`;
})();

postMisskey(message);
