import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './Chart.css';
import {DropdownButton, MenuItem, Grid, Row, Col} from 'react-bootstrap';
import sampleData from '../poverty_example.json';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownTitle: 'Default',
		}
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right'
	}

	dropdownClick = (title) => {
  	this.setState({dropdownTitle : title});
	}

	renderDropdownButton = (i) => {
	  return (
	    <DropdownButton
	      bsStyle={this.state.dropdownTitle.toLowerCase()}
	      title={this.state.dropdownTitle}
	      key={i}
	      id={`dropdown-basic-${i}`}
	    >
	      <MenuItem eventKey="1" onClick={() => {this.dropdownClick('Action');}}>Action</MenuItem>
	      <MenuItem eventKey="2" onClick={() => {this.dropdownClick('Another action');}}>Another action</MenuItem>
	    </DropdownButton>
	  );
	}

	chartHeader = () => {
		const headers = [];
		headers.push(sampleData.headers[0]);
		console.log("Hey: ",headers);
		headers.push(sampleData.headers[7]);
		headers.push(sampleData.headers[4]);
		return headers;
	}

	render () {
		console.log("Data: ", sampleData);
		console.log("Hey: ",this.chartHeader);
		return (
			<Grid>
				<Row>
	  			<Col md={2}>
	  				<div className="chart-left-dropdown">
	  					{this.renderDropdownButton('Default', 0)}
	  				</div>
	  				<div className="chart-left-text">
	  					A little bit of text about this chart.What does it all mean? Insights highlighted here.
	  				</div>
	  			</Col>
	  			<Col md={8}>
	  				<div className="chart">
							<Bar
								data = {{
										datasets: [
											{
												label: 'Male',
												data: [
													200,
													250,
													300,
												],
												backgroundColor: [
													'rgba(54, 162, 235, 0.6)',
													'rgba(54, 162, 235, 0.6)',
													'rgba(54, 162, 235, 0.6)',
												]
											},
											{
												label: 'Female',
												data: [
													250,
													300,
													400,
												],
												backgroundColor: [
													'rgba(255, 99, 132, 0.6)',
													'rgba(255, 99, 132, 0.6)',
													'rgba(255, 99, 132, 0.6)',
												]
											}
										]
									}} 
								options={{
									title: {
										display: this.props.displayTitle,
										text: 'Largest cities in Massachusetts',
										fontSize: 25
									},
									legend: {
										dislay:this.props.displayLegend,
										position: this.props.legendPosition
									},
									scales: {
								    yAxes: [{
								    	ticks: {
					              // Include a % sign in the ticks
					              callback: function(value, index, values) {
					                return value + '%';
					              }
					            },
								      scaleLabel: {
								      	labelString: 'Proportion Of Poverty',
								        display: true,
								        labelString: 'probability'
								      }
								    }]
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