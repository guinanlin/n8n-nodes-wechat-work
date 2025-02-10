import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import WechatWorkRequestUtils from '../../../help/utils/wechatWorkRequestUtils';
import ResourceBuilder from '../../../help/builder/resourceBuilder';

class MediaUploadImageOperate {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addOperate(
			'media',
			{
				name: '上传图片',
				value: 'uploadImage',
				description: '上传图片得到图片URL，该URL永久有效',
			},
			[
				{
					displayName: '文件',
					name: 'inputDataFieldName',
					type: 'string',
					placeholder: 'e.g. data',
					default: 'data',
					hint: '包含用于更新文件的二进制文件数据的输入字段的名称',
					description:
						'在左侧输入面板的二进制选项卡中，找到包含二进制数据的输入字段的名称，以更新文件',
					required: true,
				},
			],
			this.call,
		);
	}

	static async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const inputDataFieldName = this.getNodeParameter('inputDataFieldName', index) as string;

		const binaryData = this.helpers.assertBinaryData(index, inputDataFieldName);
		if (!binaryData){
			throw new Error('未找到二进制数据');
		}
		const buffer = await this.helpers.getBinaryDataBuffer(index, inputDataFieldName);

		return WechatWorkRequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/media/uploadimg`,
			json: false,
			formData: {
				media: {
					value: buffer,
					options: {
						filename: binaryData.fileName,
						filelength: binaryData.fileSize,
						contentType: binaryData.mimeType,
					},
				},
			},
		});
	}
}

export default MediaUploadImageOperate;
