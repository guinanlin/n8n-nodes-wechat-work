import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class UserGetOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '读取成员',
				value: 'user:get',
				description: '获取企业成员的详细信息',
			},
			[
				{
					displayName: '用户ID',
					name: 'userid',
					default: '',
					description:
						'成员UserID。对应管理端的账号，企业内必须唯一。不区分大小写，长度为1~64个字节',
					type: 'string',
					required: true,
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const userid = this.getNodeParameter('userid', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/user/get`,
			qs: {
				userid,
			},
		});
	}
}

export default UserGetOperate;
