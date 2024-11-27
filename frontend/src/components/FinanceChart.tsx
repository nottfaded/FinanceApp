import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';
import styles from './financeChart.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

interface FinanceData {
    category: string;
    amount: number;
    color: string;
}

interface FinanceChartProps {
    data: FinanceData[];
}

export function FinanceChart({ data }: FinanceChartProps) {
    const chartData: ChartData<'doughnut'> = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                data: data.map((item) => item.amount),
                backgroundColor: data.map((item) => item.color),
                borderColor: 'transparent',
                spacing: 2
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: '70%',
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}₴`,
                },
            },
            legend: {
                display: false,
            },
        },
    };

    const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);

    return (
        <div className={`${styles.dougnutWidth}`}>
            <Doughnut data={chartData} options={options} />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                {totalAmount}₴
            </div>
        </div>
    );
};


