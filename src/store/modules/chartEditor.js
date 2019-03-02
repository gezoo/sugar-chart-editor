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
            // state.root.nodes.push(node);
            // state.root.nodes.forEach(item => {
            //     if (item.id !== node.id) {
            //         item.selected = false;
            //     }
            // })
            state.root.nodes.set(node.id, node);
        },
        setSelectedId(state, id) {
            state.selectedId = id;
        },
        deleteNode(state, id) {
            // var index = state.root.nodes.findIndex(node=>node.id == id);
            // state.root.nodes.slice(index,1);
            state.root.nodes.delete(id);
        },
        changeNodePosition(state, payload) {
            var node = state.root.nodes.get(payload.id);
            node.x = payload.x;
            node.y = payload.y;
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
                // state.root.nodes.forEach(node => {
                //     if (node.id == id) {
                //         return node;
                //     }
                // });
                // return null;
                return state.root.node.get(id);
            }
        },
        anyNode(state) {
            return state.root.nodes.size > 0;
        },
        hasNodeById(state) {
            return (id) => {
                //return state.root.nodes.find(node => node.id == id);
                return state.root.nodes.has(id);
            }
        },
        getSelectedId(state) {
            return state.selectedId;
        }
    },
}