import config from './config/config.json' assert {type: 'json'};

export async function postMisskey(message: string) {
	const response = await fetch(config.misskeyEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			i: config.i,
			visibility: 'home', // 公開時はpublic,非公開時はhome
			localOnly: true,
			text: message,
		}),
	});
	return response.status;
}
