import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './Chart.css';
import {DropdownButton, MenuItem, Grid, Row, Col, Button} from 'react-bootstrap';
import sampleData from '../poverty_example.json';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartHeader: 'Poverty Measures By Gender',
			chartLeftText: 'A little bit of text about this chart.What does it all mean? Insights highlighted here.',
			axesLabels: this.constructAxesLabels(),
			categoryLabels: this.constructCategoryLabels(),
			barLabels: this.constructBarLabels(),
			chartData: this.constructChartData(),
			dropdownTitles: this.constructDropdownTitles(),
			dropdownIndex: 0,
		}
		console.log(this.state.chartData);
	}

	constructAxesLabels = () => {
		const labels = [];
		labels.push("POVERTY MEASURE");
		labels.push("PROPORTION OF POVERTY");
		return labels;
	}

	constructCategoryLabels = () => {
		const labels = [];
		labels.push("SEVERITY RATIO");
		labels.push("POVERTY GAP RATIO");
		labels.push("HEADCOUNT RATIO");
		return labels;
	}

	constructBarLabels = () => {
		const labels = [];
		labels.push("MALE");
		labels.push("FEMALE");
		return labels;
	}

	constructChartData = () => {
		const ppp1Data = [], ppp2Data = [];

		// Populate ppp1 male data
		const ppp1MaleData = [];
		ppp1MaleData.push((sampleData.data[2][0] * 100).toFixed(2));
		ppp1MaleData.push((sampleData.data[2][7] * 100).toFixed(2));
		ppp1MaleData.push((sampleData.data[2][4] * 100).toFixed(2));
		ppp1Data.push(ppp1MaleData);

		// Populate ppp1 female data
		const ppp1FemaleData = [];
		ppp1FemaleData.push((sampleData.data[0][0] * 100).toFixed(2));
		ppp1FemaleData.push((sampleData.data[0][7] * 100).toFixed(2));
		ppp1FemaleData.push((sampleData.data[0][4] * 100).toFixed(2));
		ppp1Data.push(ppp1FemaleData);

		// Populate ppp2 male data
		const ppp2MaleData = [];
		ppp2MaleData.push((sampleData.data[3][0] * 100).toFixed(2));
		ppp2MaleData.push((sampleData.data[3][7] * 100).toFixed(2));
		ppp2MaleData.push((sampleData.data[3][4] * 100).toFixed(2));
		ppp2Data.push(ppp2MaleData);

		// Populate ppp2 female data
		const ppp2FemaleData = [];
		ppp2FemaleData.push((sampleData.data[1][0] * 100).toFixed(2));
		ppp2FemaleData.push((sampleData.data[1][7] * 100).toFixed(2));
		ppp2FemaleData.push((sampleData.data[1][4] * 100).toFixed(2));
		ppp2Data.push(ppp2FemaleData);

		const chartData = [ppp1Data, ppp2Data];
		return chartData;
	}

	getChartData = (categoryIndex) => {
		return this.state.chartData[this.state.dropdownIndex][categoryIndex];
	}

	constructDropdownTitles = () => {
		const titles = [];
		titles.push("$1.90/day (2012 PPP)");
		titles.push("$3.10/day (2012 PPP)");
		return titles;
	}

	onDropdownClick = (dropdownIndex) => {
  	console.log("new dropdownIndex: ", dropdownIndex);
  	this.setState({dropdownIndex});
	}

	constructDropdownButton = () => {
		const dropdownButtonTitle = this.state.dropdownTitles[this.state.dropdownIndex];
	  return (
	    <DropdownButton
	      bsStyle="default"
	      title={dropdownButtonTitle}
	      key={this.state.dropdownIndex}
	      id={`dropdown-basic-${this.state.dropdownIndex}`}
	    >
	      <MenuItem eventKey="1" onClick={() => {this.onDropdownClick(0);}}>{this.state.dropdownTitles[0]}</MenuItem>
	      <MenuItem eventKey="2" onClick={() => {this.onDropdownClick(1);}}>{this.state.dropdownTitles[1]}</MenuItem>
	    </DropdownButton>
	  );
	}

	render () {
		return (
			<Grid>
				<div className="chart-header-container">
					<div className="chart-header"><b>{this.state.chartHeader}</b></div>
					<div>
						<Button bsStyle="default" id="chart-header-button">OPTIONS</Button>
					</div>
				</div>
				<Row>
	  			<Col md={3}>
	  				<div className="chart-left">
		  				<div className="chart-left-wage"><b>WAGE</b></div>
		  				<div className="chart-left-dropdown">
		  					{this.constructDropdownButton()}
		  				</div>
		  				<div className="chart-left-text">
		  					{this.state.chartLeftText}
		  				</div>
	  				</div>
	  			</Col>
	  			<Col md={9}>
	  				<div className="chart" key={this.state.dropdownIndex}>
							<Bar
								data = {{
										labels: this.state.categoryLabels,
										datasets: [
											{
												label: this.state.barLabels[0],
												data: this.getChartData(0),
												backgroundColor: Array(this.getChartData(0).length).fill('rgba(201, 219, 119)')
											},
											{
												label: this.state.barLabels[1],
												data: this.getChartData(1),
												backgroundColor: Array(this.getChartData(1).length).fill('rgba(169, 180, 223)')
											}
										]
									}}
								options={{
									defaultFontFamily: 'Helvetica',
									responsive: true, 
									maintainAspectRatio: false,
									legend: {
										dislay: true,
										position: 'bottom',
										labels: {
				              boxWidth: 15,
				              padding: 10,
				              fontSize: 9,
							    		fontStyle: 'bold',
				            }
									},
									scales: {
								    xAxes: [{
								    	ticks: {
								    		fontSize: 9,
								    		fontStyle: 'bold',
								    	},
								    	maxBarThickness: 50,
								    	barPercentage: 0.75,
								    	categoryPercentage: 0.6,
								      scaleLabel: {
								        display: true,
								        labelString: this.state.axesLabels[0],
								        fontStyle: 'bold',
								        padding: 10,
								      },
					            gridLines: {
								    		display: false,
								    		drawBorder: true,
					            },
								    },
								    // This is needed for the top most border line.
								    { 
								    	position: 'top',
								    	ticks: { display: false },
								    	gridLines: { display: false, drawTicks: false }
								    }],
								    yAxes: [{
								    	ticks: {
								    		fontSize: 9,
								    		fontStyle: 'bold',
								    		padding: 10,
								    		beginAtZero: true,
								    		min: 0,
								    		max: 100,
					              // Include a % sign in the ticks
					              callback: function(value, index, values) {
					                return value + '%';
					              }
					            },
								      scaleLabel: {
								        display: true,
								        labelString: this.state.axesLabels[1],
								        fontStyle: 'bold',
								      }
								    },
								    // This is needed for the right most border line.
								    { 
								    	position: 'right', 
								    	ticks: { display: false }, 
								    	gridLines: { display: false, drawTicks: false } 
								    }],
								  } 
								}}
							/>
						</div>
	  			</Col>
				</Row>
			</Grid>
		);
	}
}

export default Chart;