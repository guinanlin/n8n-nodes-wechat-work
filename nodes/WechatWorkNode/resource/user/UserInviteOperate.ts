import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class UserInviteOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '邀请成员',
				value: 'user:invite',
				description: '批量邀请成员使用企业微信',
			},
			[
				{
					displayName: '用户ID列表',
					name: 'user',
					default: '',
					description: '英文逗号(,)分割，最多支持1000个。',
					type: 'string',
				},
				{
					displayName: '部门ID列表',
					name: 'party',
					default: '',
					description: '英文逗号(,)分割，最多支持100个。',
					type: 'string',
				},
				{
					displayName: '标签ID列表',
					name: 'tag',
					default: '',
					description: '英文逗号(,)分割，最多支持100个。',
					type: 'string',
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const user = this.getNodeParameter('user', index) as string;
		const party = this.getNodeParameter('party', index) as string;
		const tag = this.getNodeParameter('tag', index) as string;

		const body = {
			user: user ? user.split(',') : [],
			party: party ? party.split(',') : [],
			tag: tag ? tag.split(',') : [],
		};

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/batch/invite`,
			body,
		});
	}
}

export default UserInviteOperate;
