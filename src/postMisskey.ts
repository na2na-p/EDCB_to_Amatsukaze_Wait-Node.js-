import {generalConfig} from './config/config.js';

export async function postMisskey(message: string) {
	const response = await fetch(generalConfig.misskeyEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			i: generalConfig.i,
			visibility: 'home', // 公開時はpublic,非公開時はhome
			localOnly: true,
			text: message,
		}),
	});
	return response.status;
}
