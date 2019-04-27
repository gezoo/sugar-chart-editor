import { Input, Select, Option, InputNumber, RadioGroup, Radio, ColorPicker } from 'element-ui';
import Vue from 'vue'

export default {
    ChartText: { //组件名
        text: {
            type: Input, //组件实例
            desc: '内容', //左侧显示内容
            defaultValue: '新建内容',
            props: { //组件props
                value: ''
            },
            events: { //组件事件
                input: (value) => {
                }
            },
            
        },
        'style.color': { //dom 样式： style.{css样式名}
            type: ColorPicker,
            desc: '字体颜色',
            defaultValue: '#000',
            props: {
                value: '#000',
            },
            events: {
                change: (value) => {
                }
            }
        },
        'style.text-align': {
            type: Select,
            desc: '对齐方式',
            defaultValue: 'left',
            props: {
                value: 'left',
            },
            events: {
                change: (value) => {
                }
            },
            slots: [ //Select 插槽内容
                {
                    type: Option,
                    props: {
                        value: 'left',
                        label: '左边'
                    }
                },
                {
                    type: Option,
                    props: {
                        value: 'center',
                        label: '居中',
                    }
                },
                {
                    type: Option,
                    props: {
                        value: 'right',
                        label: '右边'
                    }
                },
            ]
        },
        api: {
            type: Input, //组件实例
            desc: '内容', //左侧显示内容
            defaultValue: '新建内容',
            props: { //组件props
                value: ''
            },
            events: { //组件事件
                input: (value) => {
                }
            },
            panel:'DATA',
            disable: false
        },
    },
    image: {

    },
    timer: {

    }
}