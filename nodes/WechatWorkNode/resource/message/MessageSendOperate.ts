import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const MessageSendOperate: ResourceOperations = {
	name: '发送应用消息',
	value: 'message:send',
	description: '应用支持推送文本、图片、视频、文件、图文等类型。',
	options: [
		{
			displayName: '*消息类型',
			name: 'msgtype',
			default: 'text',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{
					name: '文本消息',
					value: 'text',
				},
				{
					name: '图片消息',
					value: 'image',
				},
				{
					name: '语音消息',
					value: 'voice',
				},
				{
					name: '视频消息',
					value: 'video',
				},
				{
					name: '文件消息',
					value: 'file',
				},
				{
					name: '文本卡片消息',
					value: 'textcard',
				},
				{
					name: '图文消息',
					value: 'news',
				},
				{
					name: '图文消息（MPNEWS）',
					value: 'mpnews',
				},
				{
					name: 'MARKDOWN消息',
					value: 'markdown',
				},
				{
					name: '小程序通知消息',
					value: 'miniprogram_notice',
				},
				{
					name: '模板卡片消息',
					value: 'template_card',
				},
			],
			required: true,
		},
		{
			displayName: '*企业应用的ID',
			name: 'agentid',
			default: '',
			description: '企业内部开发，可在应用的设置页面查看',
			type: 'string',
			required: true,
		},
		{
			displayName: '指定接收消息的成员',
			name: 'touser',
			default: '',
			description:
				'指定接收消息的成员，成员ID列表（多个接收者用‘|’分隔，最多支持1000个）。\n特殊情况：指定为"@all"，则向该企业应用的全部成员发送',
			type: 'string',
		},
		{
			displayName: '指定接收消息的部门',
			name: 'toparty',
			default: '',
			description:
				'指定接收消息的部门，部门ID列表，多个接收者用‘|’分隔，最多支持100个。\n当touser为"@all"时忽略本参数',
			type: 'string',
		},
		{
			displayName: '指定接收消息的标签',
			name: 'totag',
			default: '',
			description:
				'指定接收消息的标签，标签ID列表，多个接收者用‘|’分隔，最多支持100个。\n当touser为"@all"时忽略本参数',
			type: 'string',
		},

		//*****text
		{
			displayName: '*消息内容',
			name: 'content',
			default: '',
			description: '最长不超过2048个字节，超过将截断（支持ID转译）',
			type: 'string',
			typeOptions: {
				rows: 5,
			},
			displayOptions: {
				show: {
					msgtype: ['text'],
				},
			},
			required: true,
		},
		//*****text

		//*****image
		{
			displayName: '*图片媒体文件ID',
			name: 'media_id',
			default: '',
			description: '可以调用上传临时素材接口获取',
			type: 'string',
			displayOptions: {
				show: {
					msgtype: ['image'],
				},
			},
			required: true,
		},
		//*****image

		//*****voice
		{
			displayName: '*语音文件ID',
			name: 'media_id',
			default: '',
			description: '可以调用上传临时素材接口获取',
			type: 'string',
			displayOptions: {
				show: {
					msgtype: ['voice'],
				},
			},
			required: true,
		},
		//*****voice

		//*****video
		{
			displayName: '*视频数据',
			name: 'video',
			default: {
				media_id: undefined,
			},
			type: 'collection',
			typeOptions: {
				multipleValues: false,
			},
			options: [
				{
					displayName: '*视频媒体文件ID',
					name: 'media_id',
					default: '',
					description: '可以调用上传临时素材接口获取',
					type: 'string',
				},
				{
					displayName: '视频消息的标题',
					name: 'title',
					default: '',
					description: '不超过128个字节，超过会自动截断',
					type: 'string',
				},
				{
					displayName: '视频消息的描述',
					name: 'description',
					default: '',
					description: '不超过512个字节，超过会自动截断',
					type: 'string',
				},
			],
			displayOptions: {
				show: {
					msgtype: ['video'],
				},
			},
			required: true,
		},
		//*****video

		//*****file
		{
			displayName: '文件ID',
			name: 'media_id',
			default: '',
			description: '可以调用上传临时素材接口获取',
			type: 'string',
			displayOptions: {
				show: {
					msgtype: ['file'],
				},
			},
			required: true,
		},
		//*****file

		//****textcard
		{
			displayName: '卡片消息',
			name: 'textcard',
			default: {
				title: '',
				description: '',
				url: '',
			},
			type: 'collection',
			typeOptions: {
				multipleValues: false,
			},
			options: [
				{
					displayName: '*标题',
					name: 'title',
					default: '',
					description: '不超过128个字符，超过会自动截断（支持ID转译）',
					type: 'string',
				},
				{
					displayName: '*描述',
					name: 'description',
					default: '',
					description: '不超过512个字符，超过会自动截断（支持ID转译）',
					type: 'string',
				},
				{
					displayName: '*点击后跳转的链接',
					name: 'url',
					default: '',
					description: '最长2048字节，请确保包含了协议头(http/https)',
					type: 'string',
				},
				{
					displayName: '按钮文字',
					name: 'btntxt',
					default: '',
					description: '默认为“详情”， 不超过4个文字，超过自动截断。',
					type: 'string',
				},
			],
			displayOptions: {
				show: {
					msgtype: ['textcard'],
				},
			},
			required: true,
		},
		//****textcard

		//****news
		{
			displayName: '图文消息',
			name: 'articles',
			default: [],
			description: '一个图文消息支持1到8条图文',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			options: [
				{
					name: 'data',
					displayName: '数据',
					values: [
						{
							displayName: '标题',
							name: 'title',
							default: '',
							description: '不超过128个字符，超过会自动截断（支持ID转译）',
							type: 'string',
							required: true,
						},
						{
							displayName: '描述',
							name: 'description',
							default: '',
							description: '不超过512个字符，超过会自动截断（支持ID转译）',
							type: 'string',
						},
						{
							displayName: '点击后跳转的链接',
							name: 'url',
							default: '',
							description: '最长2048字节，请确保包含了协议头(http/https)',
							type: 'string',
						},
						{
							displayName: '图文消息的图片链接',
							name: 'picurl',
							default: '',
							description:
								'最长2048字节，支持JPG、PNG格式，较好的效果为大图 1068*455，小图150*150。',
							type: 'string',
						},
						{
							displayName: '小程序APPID',
							name: 'appid',
							default: '',
							description:
								'必须是与当前应用关联的小程序，appid和pagepath必须同时填写，填写后会忽略URL字段',
							type: 'string',
						},
						{
							displayName: '小程序页面',
							name: 'pagepath',
							default: '',
							description:
								'点击消息卡片后的小程序页面，最长128字节，仅限本小程序内的页面。appid和pagepath必须同时填写，填写后会忽略URL字段',
							type: 'string',
						},
					],
				},
			],
			displayOptions: {
				show: {
					msgtype: ['news'],
				},
			},
			required: true,
		},
		//****news

		//****mpnews
		{
			displayName: '图文消息',
			name: 'articles',
			default: [],
			description: '一个图文消息支持1到8条图文',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			options: [
				{
					name: 'data',
					displayName: '数据',
					values: [
						{
							displayName: '标题',
							name: 'title',
							default: '',
							description: '不超过128个字符，超过会自动截断（支持ID转译）',
							type: 'string',
							required: true,
						},
						{
							displayName: '图文消息缩略图的MEDIA_ID',
							name: 'thumb_media_id',
							default: '',
							description: '可以通过素材管理接口获得。此处thumb_media_id即上传接口返回的media_id',
							type: 'string',
							required: true,
						},
						{
							displayName: '图文消息的作者',
							name: 'author',
							default: '',
							description: '不超过512个字符，不超过64个字节',
							type: 'string',
						},
						{
							displayName: '图文消息点击“阅读原文”之后的页面链接',
							name: 'content_source_url',
							default: '',
							type: 'string',
						},
						{
							displayName: '图文消息的内容',
							name: 'content',
							default: '',
							description: '支持html标签，不超过666 K个字节（支持ID转译）',
							type: 'string',
							required: true,
						},
						{
							displayName: '图文消息的描述',
							name: 'digest',
							default: '',
							description: '不超过512个字节，超过会自动截断（支持ID转译）',
							type: 'string',
						},
					],
				},
			],
			displayOptions: {
				show: {
					msgtype: ['mpnews'],
				},
			},
			required: true,
		},
		//****mpnews

		//*****markdown
		{
			displayName: '*Markdown内容',
			name: 'content',
			default: '',
			description: '最长不超过2048个字节，必须是utf8编码',
			type: 'string',
			typeOptions: {
				rows: 5,
			},
			displayOptions: {
				show: {
					msgtype: ['markdown'],
				},
			},
			required: true,
		},
		//*****markdown

		//*****miniprogram_notice
		{
			displayName: '*小程序数据内容',
			name: 'miniprogram_notice',
			default: '',
			description: '参考https://developer.work.weixin.qq.com/document/path/90236#小程序通知消息',
			type: 'json',
			displayOptions: {
				show: {
					msgtype: ['miniprogram_notice'],
				},
			},
			required: true,
		},
		//*****miniprogram_notice

		//*****template_card
		{
			displayName: '*模板卡片数据内容',
			name: 'template_card',
			default: '',
			description: '参考https://developer.work.weixin.qq.com/document/path/90236#模板卡片消息',
			type: 'json',
			displayOptions: {
				show: {
					msgtype: ['template_card'],
				},
			},
			required: true,
		},
		//*****template_card

		{
			displayName: '是否是保密消息',
			name: 'safe',
			default: false,
			// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
			description: '关闭表示可对外分享，开启表示不能分享且内容显示水印',
			type: 'boolean',
		},
		{
			displayName: '是否开启ID转译',
			name: 'enable_id_trans',
			default: false,
			type: 'boolean',
		},
		{
			displayName: '是否开启重复消息检查',
			name: 'enable_duplicate_check',
			default: false,
			type: 'boolean',
		},
		{
			displayName: '重复消息检查的时间间隔(秒)',
			name: 'duplicate_check_interval',
			default: 1800,
			description: '最大不超过4小时',
			type: 'number',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		// const credentials = await this.getCredentials("wechatWorkCredentials")
		const touser = this.getNodeParameter('touser', index) as string;
		const toparty = this.getNodeParameter('toparty', index) as string;
		const totag = this.getNodeParameter('totag', index) as string;
		if (!touser && !toparty && !totag) {
			throw new NodeOperationError(this.getNode(), '请至少指定一个接收人');
		}

		const msgtype = this.getNodeParameter('msgtype', index) as string;
		let data = {
			agentid: this.getNodeParameter('agentid', index) as string,
			touser,
			toparty,
			totag,
			msgtype,
			safe: (this.getNodeParameter('safe', index) as boolean) ? 1 : 0,
			enable_id_trans: (this.getNodeParameter('enable_id_trans', index) as boolean) ? 1 : 0,
			enable_duplicate_check: (this.getNodeParameter('enable_duplicate_check', index) as boolean)
				? 1
				: 0,
			duplicate_check_interval: this.getNodeParameter('duplicate_check_interval', index) as number,
		};

		if (msgtype === 'text') {
			// @ts-ignore
			data.text = {
				content: this.getNodeParameter('content', index) as string,
			};
		} else if (msgtype === 'image') {
			// @ts-ignore
			data.image = {
				media_id: this.getNodeParameter('media_id', index) as string,
			};
		} else if (msgtype === 'video') {
			// @ts-ignore
			data.video = this.getNodeParameter('video', index) as object;
		} else if (msgtype === 'file') {
			// @ts-ignore
			data.file = {
				media_id: this.getNodeParameter('media_id', index) as string,
			};
		} else if (msgtype === 'textcard') {
			// @ts-ignore
			data.textcard = this.getNodeParameter('textcard', index) as object;
		} else if (msgtype === 'news') {
			const articles =
				((this.getNodeParameter('articles', index) as IDataObject).data as IDataObject[]) || [];

			// @ts-ignore
			data.news = {
				articles: articles,
			};
		} else if (msgtype === 'mpnews') {
			const articles =
				((this.getNodeParameter('articles', index) as IDataObject).data as IDataObject[]) || [];

			// @ts-ignore
			data.mpnews = {
				articles: articles,
			};
		} else if (msgtype === 'markdown') {
			// @ts-ignore
			data.markdown = {
				content: this.getNodeParameter('content', index) as string,
			};
		} else if (msgtype === 'miniprogram_notice') {
			// @ts-ignore
			data.miniprogram_notice = this.getNodeParameter('miniprogram_notice', index) as object;
		} else if (msgtype === 'template_card') {
			// @ts-ignore
			data.template_card = this.getNodeParameter('template_card', index) as object;
		} else {
			throw new NodeOperationError(this.getNode(), '暂不支持的消息类型');
		}

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/message/send`,
			body: data,
		});
	},
};


export default MessageSendOperate;
