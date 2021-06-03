import React, { useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { lineData, pieData, barData, mixedData } from 'views/Dashboard/chartData';
import { chartOptions } from 'utils/chart';
Chart.register(zoomPlugin);

export default function Dashboard() {
	useEffect(() => {
		let e = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -125 });
		for (let i = 0; i < 2; i++) {
			document.getElementById('barChart').dispatchEvent(e);
		}
		return () => {};
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-6 col-lg-3">
					<Card className="card-stats">
						<Card.Body>
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="nc-icon nc-chart text-warning"></i>
									</div>
								</div>
								<div className="col-7">
									<div className="numbers">
										<p className="card-category">Number</p>
										<Card.Title as="h4">150GB</Card.Title>
									</div>
								</div>
							</div>
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="fas fa-redo mr-1"></i>
								Something
							</div>
						</Card.Footer>
					</Card>
				</div>
				<div className="col-sm-6 col-lg-3">
					<Card className="card-stats">
						<Card.Body>
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="nc-icon nc-light-3 text-success"></i>
									</div>
								</div>
								<div className="col-7">
									<div className="numbers">
										<p className="card-category">Revenue</p>
										<Card.Title as="h4">$ 1,345</Card.Title>
									</div>
								</div>
							</div>
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="far fa-calendar-alt mr-1"></i>
								Last day
							</div>
						</Card.Footer>
					</Card>
				</div>
				<div className="col-sm-6 col-lg-3">
					<Card className="card-stats">
						<Card.Body>
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="nc-icon nc-vector text-danger"></i>
									</div>
								</div>
								<div className="col-7">
									<div className="numbers">
										<p className="card-category">Title</p>
										<Card.Title as="h4">23</Card.Title>
									</div>
								</div>
							</div>
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="far fa-clock mr-1"></i>
								In the last hour
							</div>
						</Card.Footer>
					</Card>
				</div>
				<div className="col-sm-6 col-lg-3">
					<Card className="card-stats">
						<Card.Body>
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="nc-icon nc-favourite-28 text-primary"></i>
									</div>
								</div>
								<div className="col-7">
									<div className="numbers">
										<p className="card-category">Followers</p>
										<Card.Title as="h4">+45K</Card.Title>
									</div>
								</div>
							</div>
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="fas fa-redo mr-1"></i>
								Something
							</div>
						</Card.Footer>
					</Card>
				</div>
			</div>
			<div className="row">
				<div className="col-md-8">
					<Card>
						<Card.Header>
							<Card.Title as="h4">Line Chart</Card.Title>
							<p className="card-category">Basic</p>
						</Card.Header>
						<Card.Body>
							<Line data={lineData} height={400} options={chartOptions('Line Chart')} />
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="fas fa-history"></i> Updated 3 minutes ago
							</div>
						</Card.Footer>
					</Card>
				</div>
				<div className="col-md-4">
					<Card>
						<Card.Header>
							<Card.Title as="h4">Pie Chart</Card.Title>
							<p className="card-category">Basic</p>
						</Card.Header>
						<Card.Body>
							<Pie
								data={pieData}
								options={chartOptions(
									'Pie Chart',
									{
										tooltip: {
											mode: 'nearest',
											callbacks: {
												label: (context) => {
													let total = context.dataset.data.reduce(
														(total, current) => total + current
													);
													return `${context.label}: ${((context.raw / total) * 100).toFixed(1)}%`;
												},
											},
										},
									},
									{ maintainAspectRatio: true }
								)}
							/>
							<hr />
							<div className="stats">
								<i className="far fa-clock"></i> 2 days ago
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<Card>
						<Card.Header>
							<Card.Title as="h4">Bar Chart</Card.Title>
							<p className="card-category">Stacked with zoom plugin enabled (scroll or swipe to test)</p>
						</Card.Header>
						<Card.Body>
							<Bar
								id="barChart"
								data={barData}
								height={400}
								options={chartOptions('Bar Chart', {
									zoom: {
										zoom: {
											wheel: {
												enabled: true,
											},
											pinch: {
												enabled: true,
											},
											mode: 'x',
										},
										pan: {
											enabled: true,
											mode: 'x',
										},
									},
								})}
							/>
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="fas fa-check"></i> Data information certified
							</div>
						</Card.Footer>
					</Card>
				</div>
				<div className="col-md-6">
					<Card className="card-tasks">
						<Card.Header>
							<Card.Title as="h4">Multi Type</Card.Title>
							<p className="card-category">Bar + Line</p>
						</Card.Header>
						<Card.Body>
							<Bar data={mixedData} height={400} options={chartOptions('Multi-Type')} />
						</Card.Body>
						<Card.Footer>
							<hr />
							<div className="stats">
								<i className="fas fa-history"></i> Updated 3 minutes ago
							</div>
						</Card.Footer>
					</Card>
				</div>
			</div>
		</div>
	);
}
