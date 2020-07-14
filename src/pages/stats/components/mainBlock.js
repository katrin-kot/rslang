import './mainBlock.css';
import * as d3 from 'd3';

let instances = 0;

function getAnswerPercent(data) {
  const { correct, wrong } = Object.values(data).reduce((acc, cur) => {
    if (cur.score) {
      const [correctLocal, wrongLocal] = cur.score.split('-');
      return { correct: acc.correct + +correctLocal, wrong: acc.wrong + +wrongLocal };
    }
    return acc;
  }, { correct: 0, wrong: 0 });
  const total = correct + wrong;
  return (correct / (total || 1)) * 100;
}

function correctAnswersStreak(data) {
  return Object.values(data).filter((el) => parseInt(el.errors) > 0).reduce((acc,cur) => {
    if(cur.score) {
      const [correct] = cur.score.split('-');
      return acc + correct;
    }
    return acc;
  },0)
}

function getNewWordsCount(data) {
  return Object.values(data).reduce((acc, cur) => {
    if(cur.score) {
      const [correct, wrong] = cur.score.split('-');
      return acc + +correct + +wrong;
    }
     return acc;
  }, 0);
}

export function mainBlock(dataFromServer, passedCardsLength = 0) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';
  const completionChartId = `chart-${instances}`;
  const barChartId = `bar-chart-${instances += 1}`;
  mainContainer.innerHTML = `
    <div class="pie-chart-block">
        <h3 class="course-completion">Course Completion</h3>
        <div id="${completionChartId}"></div>
    </div>
    <div class="bar-chart" id="${barChartId}"></div>
  `;
  setTimeout(() => {
    // Course Completion Chart
    const percent = 0.0;
    const text = `${(percent * 100).toFixed(0)}%`;
    const pieChartWidth = 260;
    const pieChartHeight = 260;
    const thickness = 30;
    const duration = 1000;
    const foregroundColor = '#0a8';
    const backgroundColor = '#ccc';
    const radius = Math.min(pieChartWidth, pieChartHeight) / 2;
    const pieChartColor = d3.scaleOrdinal([foregroundColor, backgroundColor]);

    const svg = d3.select(`#${completionChartId}`)
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
      .each(function onEach(d) {
        this.current = d;
      });
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
    const data = [
      { name: 'Кол-во пройденных карточек', value: passedCardsLength },
      { name: '% Правильных ответов', value: Math.round(getAnswerPercent(dataFromServer)) },
      { name: 'Кол-во новых слов', value: getNewWordsCount(dataFromServer) },
      { name: 'Серия правильных ответов', value: correctAnswersStreak(dataFromServer) },
    ];
    barChart(`#${barChartId}`, data);
  });

  return mainContainer;
}
