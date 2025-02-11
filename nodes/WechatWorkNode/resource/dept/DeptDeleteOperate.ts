import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/WechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class DeptDeleteOperate {
  static init(resourceBuilder: ResourceBuilder) {
    resourceBuilder.addOperate(
      'dept',
      {
        name: '删除部门',
        value: 'dept:deleteDept',
        description: '删除一个部门',
      },
      [
        {
          displayName: '部门ID',
          name: 'id',
          type: 'number',
          default: 0,
          required: true,
        },
      ],
      this.call,
    );
  }

  static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
    const id = this.getNodeParameter('id', index) as number;

    return WechatWorkRequestUtils.request.call(this, {
      method: 'GET',
      url: `/cgi-bin/department/delete`,
      qs: {
        id,
      },
    });
  }
}

export default DeptDeleteOperate;
