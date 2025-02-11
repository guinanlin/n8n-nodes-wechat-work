import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import ResourceBuilder from '../../../help/builder/resourceBuilder';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import NodeUtils from "../../../help/utils/NodeUtils";

class GroupChatCreateOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'appGroupChat',
			{
				name: '创建群聊会话',
				value: 'appGroupChat:create',
				description: '创建一个新的群聊会话',
			},
			[
				{
					displayName: '*群成员ID列表',
					name: 'userlist',
					description: '群成员ID列表。至少2人，至多2000人',
					required: true,
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
									type: 'string',
									default: '',
									required: true,
								},
							],
						},
					],
				},
				{
					displayName: '群聊名',
					name: 'name',
					default: '',
					description: '群聊名，最多50个utf8字符，超过将截断',
					type: 'string',
				},
				{
					displayName: '群主ID',
					name: 'owner',
					default: '',
					description: '指定群主的ID。如果不指定，系统会随机从userlist中选一人作为群主',
					type: 'string',
				},
				{
					displayName: '群聊唯一标志',
					name: 'chatid',
					default: '',
					description:
						'群聊的唯一标志，不能与已有的群重复；字符串类型，最长32个字符。只允许字符0-9及字母a-zA-Z。如果不填，系统会随机生成群ID',
					type: 'string',
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const name = this.getNodeParameter('name', index, '') as string;
		const owner = this.getNodeParameter('owner', index, '') as string;
		const chatid = this.getNodeParameter('chatid', index, '') as string;

		const userlist = NodeUtils.getNodeFixedCollectionList(this.getNodeParameter('userlist', index) as IDataObject, 'values', 'userid');

		const data: IDataObject = {
			name,
			owner,
			userlist,
			chatid,
		};

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/appchat/create`,
			body: data,
		});
	}
}

export default GroupChatCreateOperate;
