import { globSync } from 'glob'
import * as path from 'path';

class ModuleLoadUtils{

	static loadModules(dirPath: string, expression: string){
		const list = globSync(expression, {
			cwd: dirPath
		})

		const modules = [];
		for (const modulePath of list) {
			let fullPath = path.join(dirPath, modulePath);
			fullPath = './' + path.relative(__dirname, fullPath).replace(/\\/g, '/');
			fullPath = fullPath.replace('.d.ts', '.js')
			modules.push(require(fullPath).default)
		}

		return modules;
	}

}

export default ModuleLoadUtils;
