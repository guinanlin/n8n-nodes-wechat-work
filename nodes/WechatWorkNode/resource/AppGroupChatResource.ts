import ResourceBuilder from '../../help/builder/resourceBuilder';
import GroupChatCreateOperate from "./appGroupChat/GroupChatCreateOperate";
import GroupChatUpdateOperate from "./appGroupChat/GroupChatUpdateOperate";
import GroupChatGetOperate from "./appGroupChat/GroupChatGetOperate";
import GroupChatSendOperate from "./appGroupChat/GroupChatSendOperate";

class AppGroupChatResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '应用群聊',
			value: 'appGroupChat',
		});

		const modules = [
			GroupChatCreateOperate,
			GroupChatGetOperate,
			GroupChatSendOperate,
			GroupChatUpdateOperate
		]
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}


export default AppGroupChatResource;
