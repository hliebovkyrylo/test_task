import { useEffect, useState } from 'react';
import { Dropdown } from '../Dropdown';
import Link from 'next/link';
import { VehicleMake } from '@/typings/vehicleMake';
import { Loader } from '../Loader';

const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

export const FilterPanel = () => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [selectedVehicleMakeId, setSelectedVehicleMakeId] = useState<
    string | null
  >(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const years = Array.from(
    { length: new Date().getFullYear() - 2014 + 1 },
    (_, i) => 2015 + i
  );

  useEffect(() => {
    getVehicleMakes();
  }, []);

  const getVehicleMakes = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${apiUrl}/api/vehicles/GetMakesForVehicleType/car?format=json`
    );

    const data = await response.json();
    setVehicleMakes(data.Results);
    setIsLoading(false);
    return data;
  };

  const isButtonEnabled = selectedVehicleMakeId && selectedYear;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#303031] flex flex-col gap-6 rounded-lg p-4 w-full max-w-[540px]">
      <div className="flex gap-3 max-sm:flex-col">
        <Dropdown
          options={vehicleMakes.map((make) => ({
            value: make.MakeId,
            label: make.MakeName,
          }))}
          setValue={setSelectedVehicleMakeId}
          placeholder="Select vehicle make"
        />
        <Dropdown
          options={years.map((year) => ({
            value: year,
            label: year.toString(),
          }))}
          setValue={setSelectedYear}
          placeholder="Select year"
        />
      </div>
      <Link
        href={
          isButtonEnabled
            ? `result/${selectedVehicleMakeId}/${selectedYear}`
            : ''
        }
        className={`p-3 text-center transition-colors rounded-md ${
          isButtonEnabled
            ? 'bg-[#8785f8] hover:bg-[#9a98f7]'
            : 'bg-[#757575] pointer-events-none'
        }`}
      >
        Next
      </Link>
    </div>
  );
};
