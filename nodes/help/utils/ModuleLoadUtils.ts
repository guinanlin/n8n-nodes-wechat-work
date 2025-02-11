// @ts-ignore
import requireGlob from "require-glob";

class ModuleLoadUtils {
	static loadModules(dirPath: string, expression: string) {
		const list = requireGlob.sync(expression, {
			cwd: dirPath,
		});

		const modules = [];
		for (const module of Object.values(list)) {
			// @ts-ignore
			modules.push(module.default);
		}
		return modules;
	}
}

export default ModuleLoadUtils;
