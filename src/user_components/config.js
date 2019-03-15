import { Input, Select } from 'element-ui';
import Vue from 'vue'

export default {
    text: {
        text: {
            type: Input,
            desc: '内容',
            defaultValue: '新建内容',
            props:{
                value:'123'
            },
            events:{
                changed:(value)=>{
                    console.log(value);
                }
            }
        }
    },
    image:{

    },
    timer:{

    }
}