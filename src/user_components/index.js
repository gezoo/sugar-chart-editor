import mapping from './mapping.js';
import config from './config.js';

export default {
    install(Vue) {
        Vue.prototype.$userComponent = function (type) {
            var chlid;
            if(mapping.has(type)){
                return mapping.get(type);
            }
            return chlid;
        };
        Vue.prototype.$config = config;
    }
};