import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import ResourceBuilder from '../../../help/builder/resourceBuilder';
import WechatWorkRequestUtils from "../../../help/utils/wechatWorkRequestUtils";

class UserBatchDeleteOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '批量删除成员',
				value: 'user:batchdelete',
				description: '批量删除企业微信成员',
			},
			[
				{
					displayName: '*成员UserID列表',
					name: 'useridlist',
					type: 'fixedCollection',
					default: [],
					typeOptions: {
						multipleValues: true,
					},
					options: [
						{
							name: 'values',
							displayName: '成员列表',
							values: [
								{
									displayName: '成员UserID',
									name: 'userid',
									type: 'number',
									default: null,
									required: true,
								},
							],
						},
					],
					description: '成员UserID列表。对应管理端的账号。最多支持200个。',
					required: true,
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const useridlistFields = (this.getNodeParameter('useridlist', index) as IDataObject)
			.values as IDataObject[] || [];

		const useridlist = useridlistFields.map(field => field.userid);

		const body = {
			useridlist,
		};

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/user/batchdelete`,
			body,
		});
	}
}

export default UserBatchDeleteOperate;
