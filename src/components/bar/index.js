import { useEffect, useRef } from "react";
import * as echarts from 'echarts';

function Bar({title, xData,yData,style}){
    const chartRef = useRef()
    const chartInit = ()=>{
        const mychart = echarts.init(chartRef.current);
        mychart.setOption({
            title:{
                text:title,
            },
            tooltip:{},
            xAxis: {
                data:xData,
            },
            yAxis:{},
            series:[ {
                name:"销量",
                type:"bar",
                data: yData
            }]
           
        })
    }

    useEffect(()=>{
        chartInit()
    })

    return <div ref={chartRef} style={style}/>;
}

export default Bar