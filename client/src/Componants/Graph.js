import React, { useState, useEffect, useRef } from "react";
import './CSS/Graph.css'
import * as d3 from "d3";
import { useMediaQuery } from 'react-responsive'


const Graph = (data) => {

    const svgRef = useRef();



    useEffect(() => {

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)


        console.log(vw, vh)


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

        // console.log(averageplot)
        // console.log(Math.round(Math.max.apply(Math, tempplot)))


        let svgw = 300;
        let svgh = 0;

        if (vh < 1080) { svgh = 665 }
        else if (vh <= 1080) { svgh = 820 }
        else if (vh < 1440) { svgh = 1025 }
        else if (vh <= 1440) { svgh = 1170 }
        else if (vh <= 1600) { svgh = 1175 }
        if (vw < 500) {svgw = 300}
        else if (vw <= 1920) { svgw = 1475 }
        else if (vw <= 2560) { svgw = 1475 }
        else if (vw <= 3440) { svgw = 2050 }

        


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
            .domain([0, 55])
            .range([svgh, 0])

        const yAxisGrid = d3.axisLeft(yScale)
            .ticks(12)
            .tickSize(-svgw)
            .tickFormat('')

        svg.append("g")
            .attr("class", "grid")
            .call(yAxisGrid)
            .selectAll(".tick line")
            .attr("stroke", "lightgray")
            .attr("stroke-width", 1) // Set the stroke width of the gridlines
            .attr("stroke-opacity", 0.1)
            .filter((_, i) => i % 2 !== 0) // Select every other tick line
            .remove(); // Remove the selected tick lines


        const generatedScaledLine = d3.line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveBasis);

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
            .attr('stroke-width', '4');

        lineGroup.append('path')
            .datum(averageplot)
            .attr('class', 'line')
            .attr('d', Averageline)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', '2')
            .attr('stroke-opacity', '0.3')
            .attr('stroke-dasharray', '3 3');

        lineGroup.append('text')
            .attr('class', 'average-text')
            .attr('x', xScale(0))
            .attr('y', yScale(averageplot[0]))
            .attr('dx', 5)
            .attr('dy', -15)
            .style('fill', 'white')
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
            .style('stroke-width', '2')


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
                const yPos = yScale(tempplot[index]);

                verticalLineGroup.attr('transform', `translate(${xPos}, 0)`);

                verticalLineGroup.select('.vertical-line')
                    .attr('y1', 0) // Set the starting point of the line to the top of the graph
                    .attr('y2', yPos); // Set the ending point of the line

                dataValueText.attr('x', 10)
                    .attr('y', yPos - 5) // Position the text just above the temperature plot line
                    .style('fill', 'white') // Set the text color to white

                const dataValue = tempplot[index];
                dataValueText.text(`Value: ${dataValue}°C`);
            }
        }

        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${svgh})`)
            .attr('class', 'Xaxis');
        svg.append('g')
            .call(yAxis)
            .attr('class', 'Yaxis');


        const handleResize = () => {
            // Reload the component
            window.location.reload();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [])





    return (

        <div className="Graph">

            <svg ref={svgRef}></svg>


        </div>
    );
}

export default Graph