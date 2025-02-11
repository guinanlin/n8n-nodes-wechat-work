import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const UserGetUserIdByEmailOperate: ResourceOperations = {
	name: '通过邮箱获取用户ID',
	value: 'user:getUserIdByEmail',
	description: '通过邮箱获取其所对应的用户ID',
	options: [
		{
			displayName: '*邮箱',
			name: 'email',
			default: '',
			description: '用户的邮箱',
			type: 'string',
			placeholder: 'name@email.com',
			required: true,
		},
		{
			displayName: '邮箱类型',
			name: 'email_type',
			default: 1,
			description: '邮箱类型：1-企业邮箱（默认）；2-个人邮箱',
			type: 'options',
			options: [
				{ name: '企业邮箱', value: 1 },
				{ name: '个人邮箱', value: 2 },
			],
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const email = this.getNodeParameter('email', index) as string;
		const emailType = this.getNodeParameter('email_type', index, 1) as number;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/user/get_userid_by_email`,
			body: {
				email,
				email_type: emailType,
			},
		});
	},
};

export default UserGetUserIdByEmailOperate;