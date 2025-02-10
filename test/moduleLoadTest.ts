import ModuleLoadUtils from "../help/utils/moduleLoadUtils";

const path = __dirname + '/../dist/nodes/WechatWorkNode/resource'
console.log(ModuleLoadUtils.loadModules(path, '*.js'));
