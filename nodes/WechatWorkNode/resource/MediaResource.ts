import ResourceBuilder from '../../help/builder/ResourceBuilder';
import MediaUploadOperate from "./media/MediaUploadOperate";
import MediaGetOperate from "./media/MediaGetOperate";
import MediaUploadImageOperate from "./media/MediaUploadImageOperate";

class MediaResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '媒体管理',
			value: 'media',
		});

		const modules = [MediaGetOperate, MediaUploadImageOperate, MediaUploadOperate];
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}

export default MediaResource;
