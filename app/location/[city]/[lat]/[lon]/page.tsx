"use client";
import { CalloutCard } from "@/components/CalloutCard";
import RainChart from "@/components/RainChart";
import SidePanel from "@/components/SidePanel";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";

import React, { useEffect, useState } from "react";

type Props = {
  params: {
    lat: string;
    lon: string;
    city: string;
  };
};

function WeatherPage({ params }: Props) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${params.lat}&longitude=${params.lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=GMT`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };

    setData(fetchData());
  }, []);

  return (
    <>
      {data && (
        <div className="flex flex-col min-h-screen md:flex-row   ">
          <SidePanel
            city={params.city}
            lat={params.lat}
            long={params.lon}
            data={data}
          />

          <div className="flex-1 p-5 lg:p-10 ">
            <div className="p-5">
              <div className="pb-5">
                <h2 className="text-xl font-bold">Todays Overview</h2>
                <p className="text-sm text-gray-400">
                  {" "}
                  Last Updated at :{" "}
                  {new Date(data.current_weather?.time).toLocaleString()}{" "}
                  {data.timezone}
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
                <StatCard
                  title="Maximum Temperature"
                  metric={`${data.daily?.temperature_2m_max[0].toFixed(1)}°`}
                  color="yellow"
                />

                <StatCard
                  title="Miminmum Temperature"
                  metric={`${data.daily?.temperature_2m_min[0].toFixed(1)}°`}
                  color="green"
                />

                <div>
                  <StatCard
                    title="UV Index"
                    metric={data.daily?.uv_index_max[0].toFixed(1)}
                    color="rose"
                  />

                  {Number(data.daily?.uv_index_max[0].toFixed(1)) > 5 && (
                    <CalloutCard message="The UV is high today" warning />
                  )}
                </div>

                <div className="flex space-x-3">
                  <StatCard
                    title="Wind Speed"
                    metric={`${data.current_weather?.windspeed.toFixed(1)}m/s`}
                    color="cyan"
                  />
                  <StatCard
                    title="Wind Direction"
                    metric={`${data.current_weather?.winddirection.toFixed(
                      1
                    )}°`}
                    color="violet"
                  />
                </div>
              </div>
            </div>
            <hr className="mb-5" />

            <div className="space-y-3">
              {/* charts here */}
              <TempChart data={data} />
              <RainChart data={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherPage;
