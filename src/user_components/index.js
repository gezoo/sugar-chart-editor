import mapping from './mapping.js';

export default {
    install(Vue) {
        Vue.prototype.$userComponent = function (type) {
            var chlid;
            if(mapping.has(type)){
                return mapping.get(type);
            }
            return chlid;
        }
    }
};