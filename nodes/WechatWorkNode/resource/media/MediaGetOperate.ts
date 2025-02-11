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

		/**
		 * {
		 *     date: 'Tue, 11 Feb 2025 03:47:15 GMT',
		 *     'content-type': 'image/png',
		 *     'content-length': '80583',
		 *     connection: 'close',
		 *     server: 'nginx',
		 *     'content-disposition': `attachment; filename*=utf-8''%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE+2025-01-13+204021.png; filename="å±\x8Få¹\x95æ\x88ªå\x9B¾ 2025-01-13 204021.png"`,
		 *     'x-w-no': '7'
		 *   }
		 */
		let mimeType = response.headers['content-type'] as string | undefined;
		mimeType = mimeType ? mimeType.split(';').find((value) => value.includes('/')) : undefined;
		const contentDisposition = response.headers['content-disposition'];
		const fileNameRegex = /(?<=filename\*=utf-8'')(.*);/;
		const match = contentDisposition.match(fileNameRegex);
		let fileName = '';

		// file name was found
		if (match) {
			fileName = decodeURIComponent(match[1]);
		}

		return {
			json: {},
			binary: {
				media: await this.helpers.prepareBinaryData(
					response.body as unknown as Buffer,
					fileName,
					mimeType,
				),
			},
		}
  }
}

export default MediaGetOperate;
