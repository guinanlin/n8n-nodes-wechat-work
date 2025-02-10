import { IResource } from '../type/IResource';
import { INodeProperties } from 'n8n-workflow/dist/Interfaces';

class BuildUtils {
	static buildResources(resources: IResource[]): INodeProperties[] {
		// 构建 Operations
		let list: INodeProperties[] = [];

		list.push({
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: resources.map((item) => {
				return {
					...item,
					operations: null,
				};
			}),
			default: resources[0].value,
		});

		for (const resource of resources) {
			list.push({
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [resource.value],
					},
				},
				options: resource.operations.map((item) => {
					return {
						...item,
						options: null,
					};
				}),
				default: resource.operations[0].value,
			});

			for (const operation of resource.operations) {
				for (let option of operation.options) {
					// @ts-ignore
					list.push({
						...option,
						displayOptions: {
							...(option.displayOptions || {}),
							show: {
								...(option.displayOptions?.show || {}),
								resource: [resource.value],
								operation: [operation.value],
							},
						},
					});
				}
			}
		}

		return list;
	}

	static buildCall(
		resources: IResource[],
		resourceName: string,
		operateName: string,
	): Function | null {
		const resource = resources.find((item) => item.value === resourceName);
		if (!resource) {
			// @ts-ignore
			return null;
		}
		const operate = resource.operations.find((item) => item.value === operateName);
		// @ts-ignore
		return operate?.call;
	}
}


export default BuildUtils
