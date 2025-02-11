import ResourceBuilder from '../../help/builder/resourceBuilder';
import UserGetUserIdByEmailOperate from "./user/UserGetUserIdByEmailOperate";
import UserBatchDeleteOperate from "./user/UserBatchDeleteOperate";
import UserConvertToOpenIdOperate from "./user/UserConvertToOpenIdOperate";
import UserCreateOperate from "./user/UserCreateOperate";
import UserDeleteOperate from "./user/UserDeleteOperate";
import UserGetJoinQrcodeOperate from "./user/UserGetJoinQrcodeOperate";
import UserGetOperate from "./user/UserGetOperate";
import UserGetUserIdByMobileOperate from "./user/UserGetUserIdByMobileOperate";
import UserInviteOperate from "./user/UserInviteOperate";
import UserListIdOperate from "./user/UserListIdOperate";
import UserUpdateOperate from "./user/UserUpdateOperate";

class UserResource {
	static init(resourceBuilder: ResourceBuilder) {
		resourceBuilder.addResource({
			name: '用户管理',
			value: 'user',
		});

		const modules = [
			UserBatchDeleteOperate,
			UserConvertToOpenIdOperate,
			UserCreateOperate,
			UserDeleteOperate,
			UserGetJoinQrcodeOperate,
			UserGetOperate,
			UserGetUserIdByEmailOperate,
			UserGetUserIdByMobileOperate,
			UserInviteOperate,
			UserListIdOperate,
			UserUpdateOperate,
		];
		for (const module of modules) {
			module.init(resourceBuilder);
		}
	}
}
export default UserResource;
