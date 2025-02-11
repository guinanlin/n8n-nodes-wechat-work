import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';
import NodeUtils from "../../../help/utils/NodeUtils";

class GroupChatUpdateOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'appGroupChat',
			{
				name: '修改群聊会话',
				value: 'appGroupChat:update',
				description: '修改一个已有的群聊会话',
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
				{
					displayName: '新的群聊名',
					name: 'name',
					default: '',
					description: '最多50个utf8字符，超过将截断',
					type: 'string',
				},
				{
					displayName: '新群主ID',
					name: 'owner',
					default: '',
					type: 'string',
				},
				{
					displayName: '添加成员的ID列表',
					name: 'add_user_list',
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
					displayName: '踢出成员的ID列表',
					name: 'del_user_list',
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
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const chatid = this.getNodeParameter('chatid', index) as string;
		const name = this.getNodeParameter('name', index, '') as string;
		const owner = this.getNodeParameter('owner', index, '') as string;

		const addUserList = NodeUtils.getNodeFixedCollectionList(this.getNodeParameter('add_user_list', index) as IDataObject, 'values', 'userid');
		const delUserList = NodeUtils.getNodeFixedCollectionList(this.getNodeParameter('del_user_list', index) as IDataObject, 'values', 'userid');

		const data: IDataObject = {
			chatid,
		};

		if (name) {
			data.name = name;
		}
		if (owner) {
			data.owner = owner;
		}
		if (addUserList) {
			data.add_user_list = addUserList;
		}
		if (delUserList) {
			data.del_user_list = delUserList;
		}

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/appchat/update`,
			body: data,
		});
	}
}

export default GroupChatUpdateOperate;
