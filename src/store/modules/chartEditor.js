import Vue from 'vue';

export default {
    state: {
        root: {
            background: '../../assets/background-1.png',
            width: 1920,
            height: 1080,
            name: '',
            description: '',
            nodes: new Map(),
            cacheNodes: []
        },
        selectedId: '',
    },
    mutations: {
        addNode(state, node) {
            node.name = node.type + "测试";
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
        changeNodePosition(state, payload) {
            var node = state.root.nodes.get(payload.id);
            node.position.x = payload.x;
            node.position.y = payload.y;

            var newNode = Object.assign(node, {position:{x:payload.x,y:payload.y}} );
            state.root.nodes.set(payload.id, newNode);
            var index = state.root.cacheNodes.findIndex(x=>x.id == payload.id);
            state.root.cacheNodes[index] = newNode;
        },
        changeNodeSize(state, payload) {
            var node = state.root.nodes.get(payload.id);

            var source = {};
            if (payload.width) {
                source = { width: payload.width };
            }
            if (payload.height) {
                source = { height: payload.height };
            }
            if (payload.width && payload.height) {
                source = { width: payload.width, height: payload.height };
            }

            var newNode = Object.assign(node, source);
            state.root.nodes.set(payload.id, newNode);
            var index = state.root.cacheNodes.findIndex(x=>x.id == payload.id);
            state.root.cacheNodes[index] = newNode;
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