import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class UserListIdOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '获取成员ID列表',
				value: 'user:listId',
				description: '获取企业成员的userid与对应的部门ID列表',
			},
			[
				{
					displayName: '游标',
					name: 'cursor',
					default: '',
					description: '用于分页查询的游标，字符串类型，由上一次调用返回，首次调用不填',
					type: 'string',
				},
				{
					displayName: '分页大小',
					name: 'limita',
					default: 50,
					type: 'number',
					typeOptions: {
						minValue: 1,
						maxValue: 10000,
					},
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const cursor = this.getNodeParameter('cursor', index, '') as string;
		const limit = this.getNodeParameter('limita', index, 10000) as number;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/user/list_id`,
			body: {
				cursor,
				limit,
			},
		});
	}
}

export default UserListIdOperate;
