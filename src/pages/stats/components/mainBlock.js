import './mainBlock.css';
import * as d3 from 'd3';
import {getStatistics} from '../../../services/statsService';
import {parseDate} from "../features/date";
import {getStatForToday} from "../features/serverData";

export function mainBlock(dataFromServer) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';
  const courseCompletion = document.createElement('h3');
  courseCompletion.innerText = 'Course Completion';
  courseCompletion.className = 'course-completion';
  const completionChart = document.createElement('div');
  completionChart.id = 'chart';
  const barChartElem = document.createElement('div');
  barChartElem.id = 'bar-chart';
  const pieChartBlock = document.createElement('div');
  pieChartBlock.className = 'pie-chart-block';
  setTimeout( () => {
    // Course Completion Chart
    const percent = 0.9;
    const text = `${percent * 100}%`;
    const pieChartWidth = 260;
    const pieChartHeight = 260;
    const thickness = 30;
    const duration = 1000;
    const foregroundColor = '#0a8';
    const backgroundColor = '#ccc';
    const radius = Math.min(pieChartWidth, pieChartHeight) / 2;
    const pieChartColor = d3.scaleOrdinal([foregroundColor, backgroundColor]);
    const svg = d3.select('#chart')
      .append('svg')
      .attr('class', 'pie')
      .attr('width', pieChartWidth)
      .attr('height', pieChartHeight);
    const g = svg.append('g')
      .attr('transform', `translate(${pieChartWidth / 2},${pieChartHeight / 2})`);
    const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
    const pie = d3.pie()
      .sort(null);
    const path = g.selectAll('path')
      .data(pie([0, 1]))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => pieChartColor(i))
      .each(function onEach(d) { this.current = d; });
    path.data(pie([percent, 1 - percent])).transition()
      .duration(duration)
      .attrTween('d', function onAttrTween(d) {
        const interpolate = d3.interpolate(this.current, d);
        this.current = interpolate(0);
        return function createArc(t) {
          return arc(interpolate(t));
        };
      });
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(text);

    // Bar Chart
    const barChart = (selector, data) => {
      const barHeight = 25;
      const width = 500;
      const height = data.length * (barHeight * 2);
      const margin = {
        top: 0, right: 25, bottom: 1, left: 60,
      };
      const container = d3.select(selector);
      const chart = container.append('svg')
        .style('width', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);
      const xScale = d3.scaleLinear()
        .range([0, width / 1.2 - margin.left - margin.right])
        .domain([0, d3.max(data, (d) => d.value)]);
      const yScale = d3.scaleBand()
        .range([0, height - margin.top - margin.bottom])
        .domain(data.map((d) => d.name));
      const color = d3.scaleOrdinal()
        .range(d3.schemeCategory10)
        .domain(data.map((d) => d.name));
      const yAxis = chart.append('g')
        .call(d3.axisLeft(yScale))
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      chart.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('fill', (d) => color(d.name))
        .attr('height', barHeight)
        .attr('width', (d) => xScale(d.value))
        .attr('x', margin.left + 1)
        .attr('y', (d) => yScale(d.name) + (barHeight / 2));
      chart.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('alignment-baseline', 'middle')
        .attr('x', (d) => xScale(d.value) + margin.left + 5)
        .attr('y', (d) => yScale(d.name) + (barHeight))
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text((d) => d.value);
      yAxis.selectAll('text').style('font-size', '12px');
    };
    function getAnswerPercent(data) {
      const todayStat = getStatForToday(data);
      if (todayStat) {
        return todayStat.score.reduce((acc,cur) => {
          return acc + parseInt(cur);
        },0) / todayStat.score.length;
      }
      return 0;
    }
    const data = [
      { name: 'Кол-во пройденных карточек', value: 33 },
      { name: '% Правильных ответов', value: Math.round(getAnswerPercent(dataFromServer))},
      { name: 'Кол-во новых слов', value:  (getStatForToday(dataFromServer) || {learnedWords: 0}).learnedWords},
      { name: 'Серия правильных ответов', value: 17 },
    ];
    barChart('#bar-chart', data);
  });
  pieChartBlock.appendChild(courseCompletion);
  pieChartBlock.appendChild(completionChart);
  mainContainer.appendChild(pieChartBlock);
  mainContainer.appendChild(barChartElem);
  return mainContainer;
}
