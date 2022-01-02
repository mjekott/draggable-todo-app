import React from "react";
import { useQuery } from "react-query";
import { fecthHistoricalData } from "../api";
import ApexChart from "react-apexcharts";

interface IChart {
  coinId: string;
}

interface IHistoricalData {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart: React.FC<IChart> = ({ coinId }) => {
  const { data, isLoading } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () => fecthHistoricalData(coinId));

  return (
    <div>
      {isLoading ? (
        "Loading chart"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },

            yaxis: {
              labels: {
                formatter: function (value) {
                  return value.toFixed(2);
                },
              },
              title: {
                text: "Price",
              },
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              title: {
                text: "Date",
              },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
          }}
        />
      )}
    </div>
  );
};

export default Chart;
