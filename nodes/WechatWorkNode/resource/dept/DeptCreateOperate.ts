import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class DeptCreateOperate {
  static init(resourceBuilder: ResourceBuilder) {
    resourceBuilder.addOperate(
      'dept',
      {
        name: '创建部门',
        value: 'dept:createDept',
        description: '创建一个新的部门',
      },
      [
        {
          displayName: '部门名称',
          name: 'name',
          type: 'string',
          default: '',
          description: '部门名称。同一个层级的部门名称不能重复。长度限制为1~64个UTF-8字符，字符不能包括\:*?"&lt;&gt;｜',
          required: true,
        },
        {
          displayName: '英文名称',
          name: 'name_en',
          type: 'string',
          default: '',
          description: '英文名称。同一个层级的部门名称不能重复。需要在管理后台开启多语言支持才能生效。长度限制为1~64个字符，字符不能包括\:*?"&lt;&gt;｜',
        },
        {
          displayName: '父部门ID',
          name: 'parentid',
          type: 'number',
          default: 1,
          description: '父部门ID，32位整型',
          required: true,
        },
        {
          displayName: '次序值',
          name: 'order',
          type: 'number',
          default: 0,
          description: '在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)',
        },
        {
          displayName: '部门ID',
          name: 'id',
          type: 'number',
          default: 0,
          description: '32位整型，指定时必须大于1。若不填该参数，将自动生成ID',
        },
      ],
      this.call,
    );
  }

  static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
    const name = this.getNodeParameter('name', index) as string;
    const name_en = this.getNodeParameter('name_en', index, '') as string;
    const parentid = this.getNodeParameter('parentid', index) as number;
    const order = this.getNodeParameter('order', index, 0) as number;
    const id = this.getNodeParameter('id', index, 0) as number;

    const body: IDataObject = {
      name,
      parentid,
    };

    if (name_en) {
      body.name_en = name_en;
    }
    if (order) {
      body.order = order;
    }
    if (id > 1) {
      body.id = id;
    }

    return WechatWorkRequestUtils.request.call(this, {
      method: 'POST',
      url: `/cgi-bin/department/create`,
      body,
    });
  }
}

export default DeptCreateOperate;
