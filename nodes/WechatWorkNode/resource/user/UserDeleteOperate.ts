import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const UserDeleteOperate: ResourceOperations = {
	name: '删除成员',
	value: 'user:delete',
	description: '删除企业微信成员',
	options: [
		{
			displayName: '*成员UserID',
			name: 'userid',
			type: 'string',
			default: '',
			description: '对应管理端的账号',
			required: true,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const userid = this.getNodeParameter('userid', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/user/delete`,
			qs: {
				userid,
			},
		});
	},
};

export default UserDeleteOperate;