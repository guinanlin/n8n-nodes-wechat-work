import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import ResourceBuilder from '../../../help/builder/resourceBuilder';
import WechatWorkRequestUtils from "../../../help/utils/WechatWorkRequestUtils";

class UserDeleteOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '删除成员',
				value: 'user:delete',
				description: '删除企业微信成员',
			},
			[
				{
					displayName: '*成员UserID',
					name: 'userid',
					type: 'string',
					default: '',
					description: '对应管理端的账号',
					required: true,
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const userid = this.getNodeParameter('userid', index) as string;

		const queryParameters = {
			userid,
		};

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/user/delete`,
			qs: queryParameters,
		});
	}
}

export default UserDeleteOperate;
