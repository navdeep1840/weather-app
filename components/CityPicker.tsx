import React, { useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";

type Props = {};

type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };

  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string | null | undefined;
    longitude: string | null | undefined;
    name: string;
    countryCode: string;
    stateCode: string;
  };

  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

const CityPicker = (props: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);

  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);

    if (!City.getCitiesOfCountry(option?.value?.isoCode as string)?.length) {
      router.push(
        `/location/${option?.label}/${option?.value.latitude}/${option?.value.longitude}`
      );
    }
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);

    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <label htmlFor=""> Country</label>
        </div>
        <Select
          className="text-black"
          options={options}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <label htmlFor=""> City</label>
          </div>
          <Select
            className="text-black"
            options={City.getCitiesOfCountry(
              selectedCountry?.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude,
                longitude: city.longitude,
                name: city.name,
                countryCode: city.countryCode,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
            value={selectedCity}
            onChange={handleSelectedCity}
          />
        </div>
      )}
    </div>
  );
};

export default CityPicker;
