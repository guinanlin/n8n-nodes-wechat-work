import ResourceBuilder from '../../help/builder/ResourceBuilder';
import DeptGetSubDeptOperate from './dept/DeptGetSubDeptOperate';
import DeptCreateOperate from './dept/DeptCreateOperate';
import DeptDeleteOperate from './dept/DeptDeleteOperate';
import DeptUpdateOperate from './dept/DeptUpdateOperate';

class DeptResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '部门管理',
			value: 'dept',
		});

		const modules = [
			DeptCreateOperate,
			DeptDeleteOperate,
			DeptGetSubDeptOperate,
			DeptUpdateOperate,
		];
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}

export default DeptResource;
