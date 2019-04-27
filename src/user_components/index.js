import mapping from './mapping.js';
import baseConfig from './baseConfig.js';
import config from './config.js';
import editorConfig from './editorConfig';

export default {
    install(Vue) {
        // Vue.prototype.$userComponent = function (type) {
        //     var chlid;
        //     if (mapping.has(type)) {
        //         return mapping.get(type);
        //     }
        //     return chlid;
        // };
        Vue.prototype.$config = Object.assign({}, config, { base: baseConfig }, { editor: editorConfig });
    }
};