import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const UserGetUserIdByMobileOperate: ResourceOperations = {
	name: '通过手机号获取用户ID',
	value: 'user:getUserIdByMobile',
	description: '通过手机号获取其所对应的用户ID',
	options: [
		{
			displayName: '*手机号',
			name: 'mobile',
			default: '',
			description: '用户在企业微信通讯录中的手机号码',
			type: 'string',
			required: true,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const mobile = this.getNodeParameter('mobile', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/user/getuserid`,
			body: {
				mobile,
			},
		});
	},
};

export default UserGetUserIdByMobileOperate;