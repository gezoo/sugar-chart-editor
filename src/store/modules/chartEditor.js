import Vue from 'vue';
import guid from '../../utils/random_str';

export default {
    state: {
        root: {
            id: '83DC31202A8F0140E0530A100918D27B',
            background: '../../static/img/background-1.png',
            width: 1920,
            height: 1080,
            name: '大屏1',
            description: '',
            nodes: new Map(),
            cacheNodes: []
        },
        selectedId: '',
    },
    mutations: {
        addNode(state, node) {
            node.name = node.type + '_' + guid(6);
            state.root.nodes.set(node.id, node);
            state.root.cacheNodes.push(node);
            state.selectedId = node.id;
        },
        setSelectedId(state, id) {
            state.selectedId = id;
        },
        deleteNode(state, id) {
            state.root.nodes.delete(id);
            var idx = state.root.cacheNodes.findIndex(x => x.id == id);
            state.root.cacheNodes.splice(idx, 1);
            state.selectedId = "";
        },
        changeNode(state, payload) {
            var node = state.root.nodes.get(payload.id);
            if (node == null || node == undefined) return;

            var newNode = Object.assign(node, payload);
            state.root.nodes.set(newNode.id, newNode);
            var index = state.root.cacheNodes.findIndex(x => x.id == newNode.id);
            Vue.set(state.root.cacheNodes, index, newNode);
        }
    },
    actions: {},
    getters: {
        getEditorRoot(state) {
            return state.root;
        },
        getNodes(state) {
            return state.root.cacheNodes;
        },
        getNodeById(state) {
            return (id) => {
                return state.root.nodes.get(id);
            }
        },
        anyNode(state) {
            return state.root.nodes.size > 0;
        },
        hasNodeById(state) {
            return (id) => {
                return state.root.nodes.has(id);
            }
        },
        getSelectedId(state) {
            return state.selectedId;
        },
        getSelectedNode(state) {
            var id = state.selectedId;
            return state.root.nodes.get(id);
        }
    },
}