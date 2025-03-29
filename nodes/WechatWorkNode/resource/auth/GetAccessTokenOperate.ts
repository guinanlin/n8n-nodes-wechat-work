import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperations } from '../../../help/type/IResource';
import WechatWorkRequestUtils from "../../../help/utils/WechatWorkRequestUtils";

export default {
	name: '获取AccessToken',
	value: 'auth:getAccessToken',
	options: [],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		// 调用一次验证/刷新 access_token
		await WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/get_api_domain_ip`,
		});

		const credentials = await this.getCredentials('wechatWorkCredentialsApi');

		return {
			accessToken: credentials.accessToken,
		};
	},
} as ResourceOperations;
