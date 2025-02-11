import ResourceBuilder from '../../help/builder/resourceBuilder';
import MessageUpdateTemplateCardOperate from "./message/MessageUpdateTemplateCardOperate";
import MessageRecallOperate from "./message/MessageRecallOperate";
import MessageSendOperate from "./message/MessageSendOperate";

class MessageResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '消息推送',
			value: 'message',
		});

		const modules = [MessageRecallOperate, MessageSendOperate, MessageUpdateTemplateCardOperate];
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}

export default MessageResource;
