import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const UserGetOperate: ResourceOperations = {
	name: '读取成员',
	value: 'user:get',
	description: '获取企业成员的详细信息',
	options: [
		{
			displayName: '*用户ID',
			name: 'userid',
			default: '',
			description: '成员UserID。对应管理端的账号，企业内必须唯一。',
			type: 'string',
			required: true,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const userid = this.getNodeParameter('userid', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/user/get`,
			qs: {
				userid,
			},
		});
	},
};

export default UserGetOperate;