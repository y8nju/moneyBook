import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Bar } from "react-chartjs-2";

function HistoryChart({datas, histoyAPI}) {
	
	const [graph, setGraph] = useState(true);
	const handleGraph = (checked) => {
		if(checked) {
			setGraph(true);
		} else {
			setGraph(false)
		}
	};

	ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
	const options = {
		plugins: {
			title: {
				display: true,
				text: '카테고리별 사용 금액',
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
		};
	const labels =  ["미분류", "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타"];
	const cardSum = [0, 0, 0, 0, 0, 0, 0, 0];
	const cashSum = [0, 0, 0, 0, 0, 0, 0, 0];

	datas.forEach(data => {	// 지출 유형만 출력하자
		let idx = labels.indexOf(data.category);
		if(data.pattern === '지출' && idx !== -1){
			cardSum[idx] += data.cardAmt ?? 0;
			cashSum[idx] += data.cashAmt ?? 0;
		}
	})
	console.log(cardSum, cashSum)

	const data={
		labels,
		datasets: [
			{
				label: "현금",
				data: cashSum,
				backgroundColor: 'rgba(192, 192, 192, 0.7)',
			}, 
			{
				label: "카드",
				data: cardSum,
				backgroundColor: 'rgba(192, 192, 192, 0.4)',
			}
	]
	}
	return (
		<Container className="d-flex  flex-column mb-3">
			<Form.Check 
				type="switch"
				label="차트"
				onChange={(e) => handleGraph(e.target.checked)}
				checked={graph}
				className="ms-auto"
			/>
			{graph &&  <Bar data={data} options={options}/>}
		</Container>
	);
}

export default HistoryChart;