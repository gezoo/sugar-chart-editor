import { Input, Select, InputNumber, RadioGroup, Radio } from 'element-ui';
import Vue from 'vue'

export default {
    text: {
        text: {
            type: Input, //组件实例
            desc: '内容', //左侧显示内容
            defaultValue: '新建内容',
            props: { //组件props
                value: ''
            },
            events: { //组件事件
                input: (value) => {
                    console.log(value);
                }
            }
        }
    },
    image: {

    },
    timer: {

    }
}