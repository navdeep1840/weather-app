import Image from "next/image";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/utils/weatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

type Props = {
  city: string;
  lat: string;
  long: string;
  data: any;
};

const SidePanel = ({ city, lat, long, data }: Props) => {
  return (
    <div className=" bg-gradient-to-br from-[#394f68] to-[#183b7e] text-white p-10 ">
      <div className="pb-5">
        <h1 className="text-5xl font-bold">{decodeURI(city)}</h1>
        <p className="text-sm text-gray-400 ">
          Long/Lat : {long},{lat}
        </p>
      </div>
      <CityPicker />

      <hr className="my-10" />

      <div className="my-5 flex items-center justify-between space-x-10">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-bold uppercase  text-xl">
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <hr className="my-10 mb-5" />

      <div className="flex flex-items justify-between">
        <div>
          <Image
            src={`/${
              weatherCodeToString[data.current_weather?.weathercode]?.icon
            }.png`}
            width={75}
            height={75}
            alt=""
          />

          <div className="flex items-center justify-between space-x-10">
            <p className="text-5xl font-semibold">
              {data.current_weather?.temperature.toFixed(1)}°C
            </p>

            <p className="text-right font-extralight">
              {weatherCodeToString[data.current_weather?.weathercode]?.label}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6f90cd] rounded-md bg-[#405885]">
          <SunIcon className="h-10 w-10 text-gray-400" />

          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="uppercase text-2xl">
              {new Date(data.daily?.sunrise[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6f90cd] rounded-md bg-[#405885]">
          <MoonIcon className="h-10 w-10 text-gray-400" />

          <div className="flex-1 flex justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="uppercase text-2xl">
              {new Date(data.daily?.sunset[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
