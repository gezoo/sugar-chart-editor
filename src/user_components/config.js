import { Input, Select, InputNumber } from 'element-ui';
import Vue from 'vue'

export default {
    base: {
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
    },
    editor: {
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
            type: Input,
            desc: '背景',
            defaultValue: '',
            props: {},
            events: {
                input: (value) => {
                    console.log(value);
                }
            }
        }
    },
    text: {
        text: {
            type: Input,
            desc: '内容',
            defaultValue: '新建内容',
            props: {
                value: ''
            },
            events: {
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