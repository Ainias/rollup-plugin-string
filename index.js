import { createFilter } from 'rollup-pluginutils';

export default function string(opts = {}) {
	if (!opts.include) {
		throw Error('include option should be specified');
	}

	const filter = createFilter(opts.include, opts.exclude);

	return {
		name: 'string',

		transform(code, id) {
			if (filter(id)) {
				if (code.startsWith("module.exports =")){
					code = code.substr(16);
				}
				return {
					code: `export default ${code};`,
					map: { mappings: '' }
				};
			}
		}
	};
}
