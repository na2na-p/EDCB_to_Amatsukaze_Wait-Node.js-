import {readFileSync} from 'fs';

type generalConfigType = {
	'AddTaskPath': string;
	'AmatsukazeRoot': string;
	'serverIp': string;
	'port': string;
	'saveFolder': string;
	'misskeyEndpoint': string;
	'i': string;
}
export const generalConfig: generalConfigType = JSON.parse(readFileSync('config/config.json', 'utf8'));


type encodePresetType = Array<string>;
export const encodePreset: encodePresetType = JSON.parse(readFileSync('config/encode_settings.json', 'utf8'));
