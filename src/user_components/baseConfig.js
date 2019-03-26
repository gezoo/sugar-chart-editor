import { Input, Select, InputNumber, RadioGroup, Radio } from 'element-ui';
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
    x: {
        type: InputNumber,
        desc: 'X轴',
        props: {
            value: 0,
            'controls-position': 'right',
            min: -9999,
            max: 9999
        },
        events: {
            change: (value) => {
                console.log(value)
            }
        }
    },
    y: {
        type: InputNumber,
        desc: 'Y轴',
        props: {
            value: 0,
            'controls-position': 'right',
            min: -9999,
            max: 9999
        },
        events: {
            change: (value) => {
                console.log(value)
            }
        }
    }
}