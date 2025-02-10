import {IExecuteFunctions, NodeOperationError} from "n8n-workflow";
import {IRequestOptions} from "n8n-workflow/dist/Interfaces";


class WechatWorkRequestUtils{

	static originRequest(this: IExecuteFunctions, options: IRequestOptions){
		return this.helpers.requestWithAuthentication.call(this, 'wechatWorkCredentialsApi', options)
	}

	static request(this: IExecuteFunctions, options: IRequestOptions){
		return WechatWorkRequestUtils.originRequest.call(this, options)
			.then((text) => {
				const data : any = JSON.parse(text);
				if (data.errcode !== 0) {
					throw new NodeOperationError(this.getNode(), `WechatWork Error: ${data.errcode}, ${data.errmsg}`);
				}
				return data;
			})
	}
}

export default WechatWorkRequestUtils;
