"use client";
import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  data: any;
};

const RainChart = ({ data }: Props) => {
  const hourly = data?.hourly?.time
    .map((time: string) =>
      new Date(time).toLocaleTimeString("en-GB", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const chartData = hourly?.map((hour: any, index: number) => ({
    time: Number(hour),
    "Rain (%)": data?.hourly?.precipitation_probability[index],
  }));

  return (
    <Card>
      <Title>Chances of Rain</Title>
      <AreaChart
        data={chartData}
        className="mt-6"
        index="time"
        minValue={0}
        maxValue={100}
        showLegend
        showAnimation
        categories={["Rain (%)"]}
        colors={["blue"]}
        yAxisWidth={44}
        showXAxis={true}
      />
    </Card>
  );
};

export default RainChart;
