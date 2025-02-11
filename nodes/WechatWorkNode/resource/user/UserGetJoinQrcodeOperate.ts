import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class UserGetJoinQrcodeOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '获取加入企业二维码',
				value: 'user:getJoinQrcode',
				description: '获取实时成员加入二维码',
			},
			[
				{
					displayName: '二维码尺寸类型',
					name: 'size_type',
					default: '3',
					description: 'Qrcode尺寸类型，1: 171 x 171; 2: 399 x 399; 3: 741 x 741; 4: 2052 x 2052',
					type: 'options',
					options: [
						{ name: '171 X 171', value: '1' },
						{ name: '399 X 399', value: '2' },
						{ name: '741 X 741', value: '3' },
						{ name: '2052 X 2052', value: '4' },
					],
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const sizeType = this.getNodeParameter('size_type', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/corp/get_join_qrcode`,
			qs: {
				size_type: sizeType,
			},
		});
	}
}

export default UserGetJoinQrcodeOperate;
