// import ChartImage from './image/ChartImage.vue';
// import ChartLabel from './label/ChartText.vue';
// import ChartTimer from './timer/ChartTimer.vue';

var map = new Map();
// map.set('label/ChartText', ChartLabel);
// map.set('image/ChartImage', ChartImage);
// map.set('timer/ChartTimer', ChartTimer);

var keys = require.context('../user_components', true, /.vue$/).keys();

keys.forEach(key => {
    var path = key.replace('./','');
    var cmp = require(`../user_components/${path}`);
    map.set(path.replace('.vue', ''), cmp.default);
});

export default map