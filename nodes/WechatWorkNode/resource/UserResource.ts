import ResourceBuilder from '../../help/builder/resourceBuilder';
import ModuleLoadUtils from '../../help/utils/moduleLoadUtils';

class UserResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '用户管理',
			value: 'user',
		});

		const modules = ModuleLoadUtils.loadModules(__dirname, 'user/*.js');
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}

export default UserResource;
