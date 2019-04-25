<template>
    <div draggable="true" ref="chartText" :data-chart-type="chartType" @dragstart="ondragstart">
        <el-button icon="el-icon-picture"><slot></slot></el-button>
    </div>
</template>

<script>
    import guid from "../utils/random_str.js";

    export default {
        props: {
            chartType: {
                type: String,
                default: '',
            },
            label:{
                type:String,
                default:'',
            }
        },
        methods: {
            ondragstart(event) {
                event.dataTransfer.effectAllowed = "copy";
                event.dataTransfer.setData(
                    "text/plan",
                    `${event.target.dataset.chartType},${guid()}`
                );
            },
        }
    }
</script>