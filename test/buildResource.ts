import ModuleLoadUtils from "../nodes/help/utils/moduleLoadUtils";
import ResourceBuilder from "../nodes/help/builder/resourceBuilder";

const resourceBuilder = new ResourceBuilder();

const resources = ModuleLoadUtils.loadModules(__dirname + "/../dist/nodes/WechatWorkNode", "resource/*.js");
resources.forEach((resource) => {
	resource.init(resourceBuilder);
});

let txt = '';
for (let resource of resourceBuilder.resources) {
	txt = txt + '## ' +  resource.name + '\n';
	for (const operate of resource.operations) {
		txt = txt + '- '  + operate.name + '\n';
	}
}

console.log(txt);
