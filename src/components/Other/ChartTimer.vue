<template>
    <div>
        {{timer}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                timer: new Date(),
                timerId: -1,
            }
        },
        methods: {
            setTimer() {
                var that = this;
                this.timerId = setInterval(() => {
                    that.timer = new Date();
                }, 1000)
            }
        },
        mounted() {
            this.setTimer();
        },
        beforeDestroy() {
            clearInterval(timerId);
        },


    }
</script>