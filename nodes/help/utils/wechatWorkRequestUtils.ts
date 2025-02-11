import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { IRequestOptions } from 'n8n-workflow/dist/Interfaces';

class WechatWorkRequestUtils {
	static async originRequest(
		this: IExecuteFunctions,
		options: IRequestOptions,
		clearAccessToken = false,
	) {
		const credentials = await this.getCredentials('wechatWorkCredentialsApi');

		return this.helpers.requestWithAuthentication.call(this, 'wechatWorkCredentialsApi', options, {
			// @ts-ignore
			credentialsDecrypted: {
				data: {
					...credentials,
					accessToken: clearAccessToken ? '' : credentials.accessToken,
				},
			},
		});
	}

	static async request(this: IExecuteFunctions, options: IRequestOptions) {
		return WechatWorkRequestUtils.originRequest.call(this, options).then((text) => {
			const data: any = JSON.parse(text);

			// 处理一次accesstoken过期的情况
			if (data.errcode === 42001) {
				return WechatWorkRequestUtils.originRequest.call(this, options, true)
					.then((text) => {
						const data: any = JSON.parse(text);
						if (data.errcode !== 0) {
							throw new NodeOperationError(
								this.getNode(),
								`WechatWork Error: ${data.errcode}, ${data.errmsg}`,
							);
						}
						return data;
					});
			}

			if (data.errcode !== 0) {
				throw new NodeOperationError(
					this.getNode(),
					`WechatWork Error: ${data.errcode}, ${data.errmsg}`,
				);
			}
			return data;
		});
	}
}

export default WechatWorkRequestUtils;
