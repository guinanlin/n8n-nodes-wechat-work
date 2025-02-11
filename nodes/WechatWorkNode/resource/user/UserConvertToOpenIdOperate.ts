import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const UserConvertToOpenIdOperate: ResourceOperations = {
	name: 'Userid转openid',
	value: 'user:convertToOpenId',
	description: '将企业微信的userid转成openid',
	options: [
		{
			displayName: '*用户ID',
			name: 'userid',
			default: '',
			description: '企业内的成员ID',
			type: 'string',
			required: true,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const userid = this.getNodeParameter('userid', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/user/convert_to_openid`,
			body: {
				userid,
			},
		});
	},
};

export default UserConvertToOpenIdOperate;
