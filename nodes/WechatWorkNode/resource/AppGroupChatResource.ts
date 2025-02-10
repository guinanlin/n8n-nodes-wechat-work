import ResourceBuilder from '../../help/builder/resourceBuilder';
import ModuleLoadUtils from '../../help/utils/moduleLoadUtils';

class AppGroupChatResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '应用群聊',
			value: 'appGroupChat',
		});

		const modules = ModuleLoadUtils.loadModules(__dirname, 'appGroupChat/*.js');
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}


export default AppGroupChatResource;
