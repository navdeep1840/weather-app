import React from "react";
import { Card, Color, Divider, Metric, Subtitle, Text } from "@tremor/react";

type Props = {
  title: string;
  color?: Color;
  metric: string;
};

const StatCard = ({ title, color, metric }: Props) => {
  return (
    <Card decorationColor={color} decoration="top">
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
};

export default StatCard;
