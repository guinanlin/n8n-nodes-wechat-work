import ResourceBuilder from '../../help/builder/resourceBuilder';
import ModuleLoadUtils from '../../help/utils/moduleLoadUtils';

class DeptResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '部门管理',
			value: 'dept',
		});

		const modules = ModuleLoadUtils.loadModules(__dirname, 'dept/*.js');
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}

export default DeptResource;
