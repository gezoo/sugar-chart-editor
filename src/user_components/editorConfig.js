import { Input, Select, InputNumber, RadioGroup, Radio, ColorPicker } from 'element-ui';
import Vue from 'vue'

export default {
    width: {
        type: InputNumber,
        desc: '宽度',
        props: {
            value: 0,
            'controls-position': 'right',
            min: 1,
            max: 9999
        },
        events: {
            change: (value) => {
                console.log(value)
            }
        }
    },
    height: {
        type: InputNumber,
        desc: '高度',
        props: {
            value: 0,
            'controls-position': 'right',
            min: 1,
            max: 9999
        },
        events: {
            change: (value) => {
                console.log(value)
            }
        }
    },
    background: {
        type: RadioGroup,
        desc: '背景',
        props: {
            value: '使用背景图'
        },
        defaultValue: '使用背景图',
        events: {
            change: (value) => {
                console.log(value);
            }
        },
        slots: [ // RadioGroup的slot
            {
                key:'使用背景色',
                type: Radio,
                props: {
                    label: '使用背景色',
                },
                option: 1, //对应 options的索引
            },
            {
                key:'使用背景图',
                type: Radio,
                props: {
                    label: '使用背景图',
                },
                option: 0
            }
        ],
        options: [ //切换的子选项组件
            {
                type: Input,
                desc: '路径',
                events: {
                    input: (value) => {
                        console.log(value);
                    }
                },
            },
            {
                type: ColorPicker,
                desc: '颜色',
                events: {
                    change: (value) => {
                        console.log(value);
                    }
                },
            }

        ]
    }

}