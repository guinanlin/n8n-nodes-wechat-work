import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class GroupChatGetOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'appGroupChat',
			{
				name: '获取群聊会话',
				value: 'get',
				description: '获取一个已有的群聊会话',
			},
			[
				{
					displayName: '*群聊ID',
					name: 'chatid',
					default: '',
					description: '群聊的唯一标志',
					type: 'string',
					required: true,
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const chatid = this.getNodeParameter('chatid', index) as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/appchat/get`,
			qs: {
				chatid
			}
		});
	}
}

export default GroupChatGetOperate;
