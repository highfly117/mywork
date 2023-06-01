import React, { useState, useEffect, useRef } from "react";
import './CSS/Graph.css'
import * as d3 from "d3";


const Graph = (data) => {

    const svgRef = useRef();

    useEffect(() => {


        let timeplot = []
        let tempplot = []

        for (let i = 0; i < data.data.forecast.forecastday[0].hour.length; i++) {

            timeplot.push(data.data.forecast.forecastday[0].hour[i].time.substring(11))
            tempplot.push(data.data.forecast.forecastday[0].hour[i].temp_c)

        }

        const avg = (arry) => {

            let sum = 0;
            for (let i = 0; i < arry.length; i++) {
                sum += arry[i];
            }
            return sum / arry.length

        }

        const averageplot = Array(tempplot.length).fill(Math.round(avg(tempplot)))

        console.log(averageplot)


        const svgw = 1475;
        const svgh = 1300;
        const svg = d3.select(svgRef.current)
            .attr('width', svgw)
            .attr('height', svgh)
            .style('margin-top', '25')
            .style('margin-left', '40')
            .style('margin-bottom', '30')
            .style('overflow', 'visible')

        const xScale = d3.scaleLinear()
            .domain([0, tempplot.length - 1])
            .range([0, svgw])
        const yScale = d3.scaleLinear()
            .domain([0, 60])
            .range([svgh, 0])

        const generatedScaledLine = d3.line()
            .x((d, i) => xScale(i))
            .y(yScale)

        const Averageline = d3.line()
            .x((d, i) => xScale(i))
            .y(yScale)


        const xAxis = d3.axisBottom(xScale)
            .ticks(tempplot.length)
            .tickFormat(i => timeplot[i]);
        const yAxis = d3.axisLeft(yScale)
            .ticks(12)

        const lineGroup = svg.append('g'); // Group for lines and markers

        lineGroup.append('path')
            .datum(tempplot)
            .attr('class', 'line')
            .attr('d', generatedScaledLine)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(62, 166, 141)')
            .attr('stroke-width', '2');

        lineGroup.append('path')
            .datum(averageplot)
            .attr('class', 'line')
            .attr('d', Averageline)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(255, 0, 0)')
            .attr('stroke-width', '2')
            .attr('stroke-opacity', '0.3')
            .attr('stroke-dasharray', '3 3');

        lineGroup.append('text')
            .attr('class', 'average-text')
            .attr('x', xScale(0))
            .attr('y', yScale(averageplot[0]))
            .attr('dx', 5)
            .attr('dy', -15)
            .style('fill', 'red')
            .style('fill-opacity', '0.3')
            .text('Avg Temp ' + averageplot[0] + '°C');

        const verticalLineGroup = svg.append('g')
            .attr('class', 'vertical-line-group')
            .style('display', 'none');

        verticalLineGroup.append('line')
            .attr('class', 'vertical-line')
            .attr('y1', 0)
            .attr('y2', svgh)
            .style('stroke', 'white')
            .style('stroke-width', '1')
            .style('stroke-dasharray', '4');

        const dataValueText = verticalLineGroup.append('text')
            .attr('class', 'data-value')
            .attr('x', 10)
            .attr('y', 10)
            .style('font-size', '12px');

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', svgw)
            .attr('height', svgh)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', () => verticalLineGroup.style('display', null))
            .on('mouseout', () => verticalLineGroup.style('display', 'none'))
            .on('mousemove', mousemove);

        function mousemove(event) {
            const mouseX = d3.pointer(event)[0];
            const xValue = xScale.invert(mouseX);
            const index = Math.round(xValue); // Round to the nearest index

            if (index >= 0 && index < tempplot.length) {
                const xPos = xScale(index);

                verticalLineGroup.attr('transform', `translate(${xPos}, 0)`);

                const dataValue = tempplot[index];

                dataValueText.text(`Value: ${dataValue}°C`);
            }
        }

    }, [])





    return (

        <div className="Graph">

            <svg ref={svgRef}></svg>


        </div>
    );
}

export default Graph