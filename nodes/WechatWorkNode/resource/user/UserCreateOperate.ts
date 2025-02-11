import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import ResourceBuilder from '../../../help/builder/ResourceBuilder';
import WechatWorkRequestUtils from "../../../help/utils/WechatWorkRequestUtils";
import NodeUtils from "../../../help/utils/NodeUtils";

class UserCreateOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'user',
			{
				name: '创建成员',
				value: 'user:create',
				description: '创建企业微信成员',
			},
			[
				{
					displayName: '*成员UserID',
					name: 'userid',
					type: 'string',
					default: '',
					description:
						'对应管理端的账号，企业内必须唯一。长度为1~64个字节。只能由数字、字母和“_-@.”四种字符组成，且第一个字符必须是数字或字母。系统进行唯一性检查时会忽略大小写',
					required: true,
				},
				{
					displayName: '*成员名称',
					name: 'name',
					type: 'string',
					default: '',
					description: '长度为1~64个utf8字符',
					required: true,
				},
				{
					displayName: '成员别名',
					name: 'alias',
					type: 'string',
					default: '',
					description: '长度1~64个utf8字符',
				},
				{
					displayName: '手机号码',
					name: 'mobile',
					type: 'string',
					default: '',
					description: '企业内必须唯一，mobile/email二者不能同时为空',
				},
				{
					displayName: '成员所属部门列表',
					name: 'department',
					type: 'fixedCollection',
					default: [],
					typeOptions: {
						multipleValues: true,
					},
					options: [
						{
							name: 'values',
							displayName: '部门列表',
							values: [
								{
									displayName: '部门ID',
									name: 'departmentId',
									type: 'string',
									default: '',
									required: true,
								},
								{
									displayName: '排序',
									name: 'order',
									type: 'number',
									default: 0,
								},
								{
									displayName: '是否为部门负责人',
									name: 'is_leader_in_dept',
									type: 'boolean',
									default: false,
								},
							],
						},
					],
					description:
						'不超过100个。当不填写department或ID为0时，成员会放在其他（待设置部门）下，当填写的部门不存在时，会在在其他（待设置部门）下新建对应部门',
				},
				{
					displayName: '职务信息',
					name: 'position',
					type: 'string',
					default: '',
				},
				{
					displayName: '性别',
					name: 'gender',
					type: 'options',
					options: [
						{ name: '男性', value: '1' },
						{ name: '女性', value: '2' },
					],
					default: '1',
					description: '性别。',
				},
				{
					displayName: '邮箱',
					name: 'email',
					type: 'string',
					placeholder: 'name@email.com',
					default: '',
					description: '邮箱。',
				},
				{
					displayName: '企业邮箱',
					name: 'biz_mail',
					type: 'string',
					default: '',
					description: '企业邮箱。',
				},
				{
					displayName: '座机',
					name: 'telephone',
					type: 'string',
					default: '',
					description: '座机。',
				},
				{
					displayName: '直属上级列表',
					name: 'direct_leader',
					description: '设置范围为企业内成员，可以设置最多1个上级',
					type: 'fixedCollection',
					default: [],
					typeOptions: {
						multipleValues: true,
					},
					options: [
						{
							name: 'values',
							displayName: '部门列表',
							values: [
								{
									displayName: '直属上级UserID',
									name: 'direct_leader',
									type: 'string',
									default: '',
									required: true,
								},
							],
						},
					],
				},
				{
					displayName: '成员头像的Mediaid',
					name: 'avatar_mediaid',
					type: 'string',
					default: '',
					description: '通过素材管理接口上传图片获得的mediaid。',
				},
				{
					displayName: '地址',
					name: 'address',
					type: 'string',
					default: '',
				},
				{
					displayName: '是否主部门',
					name: 'main_department',
					type: 'boolean',
					default: true,
				},
				{
					displayName: '启用/禁用成员',
					name: 'enable',
					type: 'boolean',
					default: true,
				},
				{
					displayName: '是否邀请成员使用企业微信',
					name: 'to_invite',
					type: 'boolean',
					default: true,
				},
				{
					displayName: '额外属性',
					name: 'json',
					type: 'json',
					default: '{}',
					description: '额外扩展属性，比如external_profile，external_position等',
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const departments = NodeUtils.getNodeFixedCollection(this.getNodeParameter('department', index) as IDataObject, 'values');

		const directLeaders = NodeUtils.getNodeFixedCollectionList(this.getNodeParameter('direct_leader', index) as IDataObject, 'values', 'direct_leader');

		const json = this.getNodeParameter('json', index) as IDataObject || {};

		const body: IDataObject = {
			userid: this.getNodeParameter('userid', index) as string,
			department: departments.map((department) => {
				return department.departmentId;
			}),
			order: departments.map((department) => {
				return department.order;
			}),
			is_leader_in_dept: departments.map((department) => {
				return department.is_leader_in_dept;
			}),
			direct_leader: directLeaders,
			enable: this.getNodeParameter('enable', index) ? 1 : 0,
			main_department: this.getNodeParameter('main_department', index) ? 1 : 0,
			to_invite: this.getNodeParameter('to_invite', index),
			...json
		};

		const name = this.getNodeParameter('name', index) as string;
		if (name) {
			body.name = name;
		}

		const alias = this.getNodeParameter('alias', index) as string;
		if (alias) {
			body.alias = alias;
		}

		const mobile = this.getNodeParameter('mobile', index) as string;
		if (mobile) {
			body.mobile = mobile;
		}

		const position = this.getNodeParameter('position', index) as string;
		if (position) {
			body.position = position;
		}

		const gender = this.getNodeParameter('gender', index) as string;
		if (gender) {
			body.gender = gender;
		}

		const email = this.getNodeParameter('email', index) as string;
		if (email) {
			body.email = email;
		}

		const biz_mail = this.getNodeParameter('biz_mail', index) as string;
		if (biz_mail) {
			body.biz_mail = biz_mail;
		}

		const avatar_mediaid = this.getNodeParameter('avatar_mediaid', index) as string;
		if (avatar_mediaid) {
			body.avatar_mediaid = avatar_mediaid;
		}

		const telephone = this.getNodeParameter('telephone', index) as string;
		if (telephone) {
			body.telephone = telephone;
		}

		const address = this.getNodeParameter('address', index) as string;
		if (address) {
			body.address = address;
		}

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/user/create`,
			body,
		});
	}
}

export default UserCreateOperate;
