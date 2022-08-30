import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Container } from 'react-bootstrap';
  import { Bar } from 'react-chartjs-2';

  function ReportBarChart({datas}) {
    ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: '수입, 지출',
          },
        },
      };
    let incomeSum = 0;
    let expenseSum = 0;
    datas.forEach(data => {
        if(data.pattern === '지출') {
            expenseSum += data.cardAmt ?? 0;
            expenseSum += data.cashAmt ?? 0;
        }
        if(data.pattern === '수입') {
            incomeSum += data.cardAmt ?? 0;
            incomeSum += data.cashAmt ?? 0;
        }
    })
    console.log(expenseSum, incomeSum)
    const data = {
        labels: ["수입 및 지출"],
        datasets: [
          {
            label: '수입',
            data: [incomeSum],
            backgroundColor: 'rgba(192, 192, 192, 0.7)',
          },
          {
            label: '지출',
            data: [expenseSum],
            backgroundColor: 'rgba(192, 192, 192, 0.4)',
            },
        ],
      };
    return ( <Container>
        <Bar data={data} options={options} height={50}/>
    </Container> );
  }
  
  export default ReportBarChart;