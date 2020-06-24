import './mainBlock.css'
import * as d3 from "d3";

export function mainBlock() {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    const courseCompletion = document.createElement('h3');
    courseCompletion.innerText = 'Course Completion';
    courseCompletion.className = 'course-completion'
    const completionChart = document.createElement('div');
    completionChart.id = 'chart';
    const barChartElem = document.createElement('div');
    barChartElem.id = 'bar-chart';
    const pieChartBlock = document.createElement('div');
    pieChartBlock.className = 'pie-chart-block';
    document.addEventListener('DOMContentLoaded', function(e) {
        // Course Completion Chart
        let percent = .9;
        let text = (percent * 100) + "%";
        let width = 260;
        let height = 260;
        let thickness = 30;
        let duration = 1000;
        let foregroundColor = "#0a8";
        let backgroundColor = "#ccc";
        let radius = Math.min(width, height) / 2;
        let color = d3.scaleOrdinal([foregroundColor, backgroundColor]);
        let svg = d3.select("#chart")
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
        let arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);
        let pie = d3.pie()
            .sort(null);
        let path = g.selectAll('path')
            .data(pie([0, 1]))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(i);
            })
            .each(function(d) { this._current = d; });
        path.data(pie([percent, 1-percent])).transition()
            .duration(duration)
            .attrTween('d', function(d) {
                let interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return arc(interpolate(t));
                }
            });
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(text);

        //Bar Chart
        const barChart = (selector, data) => {
            const barHeight = 25;
            const width = 500;
            const height = data.length * (barHeight * 2);
            const margin = { top: 0, right: 25, bottom: 1, left: 60 };
            const container = d3.select(selector);
            const chart = container.append('svg')
                .style('width', '100%')
                .attr('viewBox', `0 0 ${width} ${height}`);
            const xScale = d3.scaleLinear()
                .range([0, width/1.2 - margin.left - margin.right])
                .domain([0, d3.max(data, d => d.value)]);
            const yScale = d3.scaleBand()
                .range([0, height - margin.top - margin.bottom])
                .domain(data.map(d => d.name));
            const color = d3.scaleOrdinal()
                .range(d3.schemeCategory10)
                .domain(data.map(d => d.name));
            const yAxis = chart.append('g')
                .call(d3.axisLeft(yScale))
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            chart.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('fill', d => color(d.name))
                .attr('height', barHeight)
                .attr('width', d => xScale(d.value))
                .attr('x', margin.left + 1)
                .attr('y', d => yScale(d.name) + (barHeight / 2));
            chart.selectAll('.label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'label')
                .attr('alignment-baseline', 'middle')
                .attr('x', d => xScale(d.value) + margin.left + 5)
                .attr('y', d => yScale(d.name) + (barHeight))
                .style('font-size', '12px')
                .style('font-weight', 'bold')
                .text(d => d.value);
            yAxis.selectAll('text').style('font-size', '12px');
        };
        const data = [
            { name: "Кол-во пройденных карточек", value: 33 },
            { name: "% Правильных ответов", value: 87 },
            { name: "Кол-во новых слов", value: 12 },
            { name: "Серия правильных ответов", value : 17},
        ];
        barChart("#bar-chart", data);
    })
    pieChartBlock.appendChild(courseCompletion);
    pieChartBlock.appendChild(completionChart);
    mainContainer.appendChild(pieChartBlock);
    mainContainer.appendChild(barChartElem);
    return mainContainer;
}