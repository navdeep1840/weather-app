"use client";
import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394f68] to-[#183b7e] p-10 flex flex-col justify-center items-center   ">
      <Card className="max-w-3xl mx-auto bg-white">
        <Text className="text-4xl font-bold text-center mb-10">
          Weather App
        </Text>
        <Divider className="my-10" />
        <Card
          className="
        bg-gradient-to-br from-[#394f68] to-[#183b7e]
 "
        >
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
