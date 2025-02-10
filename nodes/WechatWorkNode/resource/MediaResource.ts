import ResourceBuilder from '../../help/builder/resourceBuilder';
import ModuleLoadUtils from '../../help/utils/moduleLoadUtils';

class MediaResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '媒体管理',
			value: 'media',
		});

		const modules = ModuleLoadUtils.loadModules(__dirname, 'media/*.js');
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}

export default MediaResource;
