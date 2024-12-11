"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { VehicleMake } from "@/typings/vehicleMake";

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [selectedVehicleMakeId, setSelectedVehicleMakeId] = useState<
    string | null
  >(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = Array.from(
    { length: new Date().getFullYear() - 2014 + 1 },
    (_, i) => 2015 + i
  );

  useEffect(() => {
    getVehicleMakes();
  }, []);

  const getVehicleMakes = async () => {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );

    const data = await response.json();
    setVehicleMakes(data.Results);
    return data;
  };

  const isButtonEnabled = selectedVehicleMakeId && selectedYear;

  return (
    <>
      <select onChange={(e) => setSelectedVehicleMakeId(e.target.value)}>
        {vehicleMakes?.map((vehicleMake) => (
          <option key={vehicleMake.MakeId} value={vehicleMake.MakeId}>
            {vehicleMake.MakeName}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedYear(+e.target.value)}>
        {years?.map((year) => (
          <option key={year}>{year}</option>
        ))}
      </select>
      <Link
        href={
          isButtonEnabled
            ? `result/${selectedVehicleMakeId}/${selectedYear}`
            : ""
        }
      >
        Next
      </Link>
    </>
  );
}
