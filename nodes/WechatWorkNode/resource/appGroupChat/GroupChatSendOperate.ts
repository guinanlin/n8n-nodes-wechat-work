import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class GroupChatSendOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'appGroupChat',
			{
				name: '发送群聊消息',
				value: 'appGroupChat:send',
				description: '发送消息到群聊',
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
					displayName: '*消息类型',
					name: 'msgtype',
					default: 'text',
					type: 'options',
					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
					options: [
						{ name: '文本消息', value: 'text' },
						{ name: '图片消息', value: 'image' },
						{ name: '语音消息', value: 'voice' },
						{ name: '视频消息', value: 'video' },
						{ name: '文件消息', value: 'file' },
						{ name: '文本卡片消息', value: 'textcard' },
						{ name: '图文消息', value: 'news' },
						{ name: '图文消息（MPNEWS）', value: 'mpnews' },
						{ name: 'MARKDOWN消息', value: 'markdown' },
					],
					required: true,
				},
				{
					displayName: '*消息内容',
					name: 'content',
					default: '',
					description: '消息内容，最长不超过2048个字节',
					type: 'string',
					displayOptions: {
						show: {
							msgtype: ['text', 'markdown'],
						},
					},
					required: true,
				},
				{
					displayName: '*媒体文件ID',
					name: 'media_id',
					default: '',
					description: '媒体文件ID，可以调用上传临时素材接口获取',
					type: 'string',
					displayOptions: {
						show: {
							msgtype: ['image', 'voice', 'video', 'file'],
						},
					},
					required: true,
				},
				{
					displayName: '视频消息的标题',
					name: 'title',
					default: '',
					description: '视频消息的标题，不超过128个字节',
					type: 'string',
					displayOptions: {
						show: {
							msgtype: ['video'],
						},
					},
				},
				{
					displayName: '视频消息的描述',
					name: 'description',
					default: '',
					description: '视频消息的描述，不超过512个字节',
					type: 'string',
					displayOptions: {
						show: {
							msgtype: ['video'],
						},
					},
				},
				{
					displayName: '是否是保密消息',
					name: 'safe',
					default: false,
					type: 'boolean',
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const chatid = this.getNodeParameter('chatid', index) as string;
		const msgtype = this.getNodeParameter('msgtype', index) as string;
		const safe = this.getNodeParameter('safe', index, false) as boolean ? 1 : 0;

		let data: IDataObject = {
			chatid,
			msgtype,
			safe,
		};

		if (msgtype === 'text' || msgtype === 'markdown') {
			data[msgtype] = {
				content: this.getNodeParameter('content', index) as string,
			};
		} else if (msgtype === 'image' || msgtype === 'voice' || msgtype === 'file') {
			data[msgtype] = {
				media_id: this.getNodeParameter('media_id', index) as string,
			};
		} else if (msgtype === 'video') {
			data.video = {
				media_id: this.getNodeParameter('media_id', index) as string,
				title: this.getNodeParameter('title', index, '') as string,
				description: this.getNodeParameter('description', index, '') as string,
			};
		} else {
			throw new NodeOperationError(this.getNode(), '暂不支持的消息类型');
		}

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/appchat/send`,
			body: data,
		});
	}
}

export default GroupChatSendOperate;
