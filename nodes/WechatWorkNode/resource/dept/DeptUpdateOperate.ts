import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class DeptUpdateOperate {
  static init(resourceBuilder: ResourceBuilder) {
    resourceBuilder.addOperate(
      'dept',
      {
        name: '更新部门',
        value: 'updateDept',
        description: '更新一个部门的信息',
      },
      [
        {
          displayName: '部门ID',
          name: 'id',
          type: 'number',
          default: 0,
          required: true,
        },
        {
          displayName: '部门名称',
          name: 'name',
          type: 'string',
          default: '',
          description: '部门名称。长度限制为1~64个UTF-8字符，字符不能包括\:*?"&lt;&gt;｜',
        },
        {
          displayName: '英文名称',
          name: 'name_en',
          type: 'string',
          default: '',
          description: '需要在管理后台开启多语言支持才能生效。长度限制为1~64个字符，字符不能包括\:*?"&lt;&gt;｜',
        },
        {
          displayName: '父部门ID',
          name: 'parentid',
          type: 'number',
          default: 0,
        },
        {
          displayName: '次序值',
          name: 'order',
          type: 'number',
          default: 0,
          description: '在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)',
        },
      ],
      this.call,
    );
  }

  static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
    const id = this.getNodeParameter('id', index) as number;
    const name = this.getNodeParameter('name', index, '') as string;
    const name_en = this.getNodeParameter('name_en', index, '') as string;
    const parentid = this.getNodeParameter('parentid', index, 0) as number;
    const order = this.getNodeParameter('order', index, 0) as number;

    const body: IDataObject = {
      id,
    };

    if (name) {
      body.name = name;
    }
    if (name_en) {
      body.name_en = name_en;
    }
    if (parentid) {
      body.parentid = parentid;
    }
    if (order) {
      body.order = order;
    }

    return WechatWorkRequestUtils.request.call(this, {
      method: 'POST',
      url: `/cgi-bin/department/update`,
      body,
    });
  }
}

export default DeptUpdateOperate;
