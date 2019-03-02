import Vue from 'vue';
import Vuex from 'vuex';
import editor from './modules/chartEditor.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        editor,
    }
});

export default store;