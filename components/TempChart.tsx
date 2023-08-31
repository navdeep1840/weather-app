"use client";
import { WeatherInfo } from "@/typings";
import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  data: WeatherInfo;
};

const TempChart = ({ data }: Props) => {
  const hourly = data?.hourly?.time
    .map((time: string) =>
      new Date(time).toLocaleTimeString("en-GB", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const chartData = hourly?.map((hour, index: number) => ({
    time: Number(hour),
    "UV Index": data?.hourly?.uv_index[index],
    "Temp (C)": data.hourly?.temperature_2m[index],
  }));

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        data={chartData}
        className="mt-6"
        index="time"
        minValue={0}
        showLegend
        showAnimation
        categories={["Temp (C)", "UV Index"]}
        colors={["yellow", "rose"]}
        yAxisWidth={44}
        showXAxis={true}
      />
    </Card>
  );
};

export default TempChart;
