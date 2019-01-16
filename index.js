'use strict';

var rollupPluginutils = require('rollup-pluginutils');

function string(opts) {
	if ( opts === void 0 ) opts = {};

	if (!opts.include) {
		throw Error('include option should be specified');
	}

	var filter = rollupPluginutils.createFilter(opts.include, opts.exclude);

	return {
		name: 'string',

		transform: function transform(code, id) {
			if (filter(id)) {
				if (code.startsWith("module.exports =")){
					code = code.substr(16);
				}
				return {
					code: ("export default " + code + ";"),
					map: { mappings: '' }
				};
			}
		}
	};
}

module.exports = string;
