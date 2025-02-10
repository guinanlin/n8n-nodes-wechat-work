import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class MediaGetOperate {
  static init(resourceBuilder: ResourceBuilder) {
    resourceBuilder.addOperate(
      'media',
      {
        name: '获取临时素材',
        value: 'getMedia',
      },
      [
        {
          displayName: '媒体文件ID',
          name: 'media_id',
          type: 'string',
          default: '',
          required: true,
        }
      ],
      this.call,
    );
  }

  static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
    const media_id = this.getNodeParameter('media_id', index) as string;

    const response = await WechatWorkRequestUtils.originRequest.call(this, {
      method: 'GET',
      url: `/cgi-bin/media/get`,
      qs: {
        media_id,
      },
			encoding: null,
			json: false,
			resolveWithFullResponse: true,
    });

		return {
			json: {},
			binary: {
				media: response.body,
			},
		}
  }
}

export default MediaGetOperate;
