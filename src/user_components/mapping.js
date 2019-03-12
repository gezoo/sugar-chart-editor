import ChartImage from './image/ChartImage.vue';
import ChartLabel from './label/ChartText.vue';
import ChartTimer from './timer/ChartTimer.vue';

var map = new Map();
map.set('text', ChartLabel);
map.set('image', ChartImage);
map.set('timer', ChartTimer);

export default map