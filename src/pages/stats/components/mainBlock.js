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

    document.addEventListener('DOMContentLoaded', function(e) {
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

    })
    mainContainer.appendChild(courseCompletion);
    mainContainer.appendChild(completionChart);
    return mainContainer;
}