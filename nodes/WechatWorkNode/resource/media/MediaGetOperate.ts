import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const MediaGetOperate: ResourceOperations = {
	name: '获取临时素材',
	value: 'media:get',
	options: [
		{
			displayName: '媒体文件ID',
			name: 'media_id',
			type: 'string',
			default: '',
			required: true,
		}
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const media_id = this.getNodeParameter('media_id', index) as string;

		const response = await WechatWorkRequestUtils.originRequest.call(this, {
			method: 'GET',
			url: `/cgi-bin/media/get`,
			qs: {
				media_id,
			},
			encoding: null,
			json: false,
			resolveWithFullResponse: true,
		});

		let mimeType = response.headers['content-type'] as string | undefined;
		mimeType = mimeType ? mimeType.split(';').find((value) => value.includes('/')) : undefined;
		const contentDisposition = response.headers['content-disposition'];
		const fileNameRegex = /(?<=filename\*=utf-8'')(.*);/;
		const match = contentDisposition.match(fileNameRegex);
		let fileName = '';

		if (match) {
			fileName = decodeURIComponent(match[1]);
		}

		return {
			json: {},
			binary: {
				media: await this.helpers.prepareBinaryData(
					response.body as unknown as Buffer,
					fileName,
					mimeType,
				),
			},
		}
	},
};

export default MediaGetOperate;
