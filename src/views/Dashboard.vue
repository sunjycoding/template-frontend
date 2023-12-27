<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue';

const option = {
    graphic: {
        elements: [
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: 'Template Dashboard',
                    fontSize: 80,
                    fontWeight: 'bold',
                    lineDash: [0, 200],
                    lineDashOffset: 0,
                    fill: 'transparent',
                    stroke: '#000',
                    lineWidth: 1
                },
                keyframeAnimation: {
                    duration: 3000,
                    loop: true,
                    keyframes: [
                        {
                            percent: 0.7,
                            style: {
                                fill: 'transparent',
                                lineDashOffset: 200,
                                lineDash: [200, 0]
                            }
                        },
                        {
                            // Stop for a while.
                            percent: 0.8,
                            style: {
                                fill: 'transparent'
                            }
                        },
                        {
                            percent: 1,
                            style: {
                                fill: 'black'
                            }
                        }
                    ]
                }
            }
        ]
    }
}


const chartRef = ref(null);
let myChart = null;

onMounted(() => {
    initChart();
})

onUnmounted(() => {
    if (myChart) {
        myChart.dispose()
    }
})

const initChart = () => {
    if (!chartRef.value) {
        return
    }
    myChart = echarts.init(chartRef.value)
    myChart.setOption(option)
}
</script>

<template>
    <div class="container">
        <div ref="chartRef" style="background-color: #EDEFF6; width: 80%; height:100%;"></div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>