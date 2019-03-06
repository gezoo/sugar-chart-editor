export default {
    state: {
        root: {
            background: '../../assets/background-1.png',
            width: 1920,
            height: 1080,
            name: '',
            description: '',
            nodes: new Map()
        },
        selectedId: '',
    },
    mutations: {
        addNode(state, node) {
            state.root.nodes.set(node.id, node);
        },
        setSelectedId(state, id) {
            state.selectedId = id;
        },
        deleteNode(state, id) {
            state.root.nodes.delete(id);
        },
        changeNodePosition(state, payload) {
            var node = state.root.nodes.get(payload.id);
            node.position.x = payload.x;
            node.position.y = payload.y;
        },
        changeNodeSize(state, payload) {
            var node = state.root.nodes.get(payload.id);
            if (payload.width) {
                node.width = payload.width;
            }
            if (payload.height) {
                node.height = payload.height;
            }
        }
    },
    actions: {},
    getters: {
        getEditorRoot(state) {
            return state.root;
        },
        getNodeById(state) {
            return (id) => {
                return state.root.node.get(id);
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
        }
    },
}