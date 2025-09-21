import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: { name: string; value: number }[];
}

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  // Generate random colors for each data point
  const backgroundColors = data.map(() => getRandomColor());
  const hoverBackgroundColors = data.map(() => getRandomColor());

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderWidth: 1,
        borderColor: "#444",
      },
    ],
  };

  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "right" as const,
        align: "start" as const,
        labels: {
          generateLabels: (chart: { data: unknown }) => {
            const data = chart.data as {
              labels: string[];
              datasets: { data: number[]; backgroundColor: string[] }[];
            };
            if (data.labels) {
              return data.labels.map((label, i) => ({
                text: `${label}    ${(
                  (data.datasets[0].data[i] / totalValue) *
                  100
                ).toFixed(1)}%`,
                fontColor: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i,
              }));
            }
            return [];
          },
          font: { size: 12, family: "Arial, sans-serif" },
          padding: 10,
          boxWidth: 0,
          usePointStyle: false,
        },
      },
      tooltip: {
        callbacks: {
          label: function (
            tooltipItem: import("chart.js").TooltipItem<"doughnut">
          ) {
            const raw = tooltipItem.raw;
            if (typeof raw === "number") {
              return `$${raw.toLocaleString()}`;
            }
            return "";
          },
        },
      },
    },
    layout: {
      padding: {
        right: 120,
      },
    },
  };

  return (
    <div className="relative h-full w-full" style={{ minHeight: "200px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
