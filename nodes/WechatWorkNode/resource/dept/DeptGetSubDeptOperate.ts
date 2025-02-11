import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class DeptGetSubDeptOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'dept',
			{
				name: '获取子部门ID列表',
				value: 'dept:getSubDept',
				description: '获取指定部门及其下的子部门ID列表',
			},
			[
				{
					displayName: '部门ID',
					name: 'id',
					default: '',
					description: '获取指定部门及其下的子部门（以及子部门的子部门等等，递归）。如果不填，默认获取全量组织架构',
					type: 'string'
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const id = this.getNodeParameter('id', index, '') as string;

		return WechatWorkRequestUtils.request.call(this, {
			method: 'GET',
			url: `/cgi-bin/department/simplelist`,
			qs: {
				id,
			},
		});
	}
}

export default DeptGetSubDeptOperate;
