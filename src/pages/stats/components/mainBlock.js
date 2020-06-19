import './mainBlock.css'
import * as d3 from "d3";

export function mainBlock() {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    const courseCompletion = document.createElement('h3');

    const completionChart = document.createElement('div');
    completionChart.id = 'chart';

    document.addEventListener('DOMContentLoaded', function(e) {
        var percent = .9;
        var text = (percent * 100) + "%";

        var width = 260;
        var height = 260;
        var thickness = 30;
        var duration = 750;
        var foregroundColor = "#0a8";
        var backgroundColor = "#ccc";

        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal([foregroundColor, backgroundColor]);

        var svg = d3.select("#chart")
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);

        var g = svg.append('g')
            .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        var pie = d3.pie()
            .sort(null);

        var path = g.selectAll('path')
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
                var interpolate = d3.interpolate(this._current, d);
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

    mainContainer.appendChild(completionChart);
    console.log(1);
    return mainContainer;
}