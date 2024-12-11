import { CarCard } from '@/components/CarCard';
import { Car } from '@/typings/car';
import Link from 'next/link';

export default async function Result({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = await params;

  const fetchModels = async (makeId: string, year: string) => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await response.json();
    return data.Results || [];
  };

  const models: Car[] = await fetchModels(makeId, year);

  return (
    <div className="flex flex-col justify-between h-screen p-10">
      <div>
        <h1 className="text-2xl mb-3">Vehicles</h1>
        <div className="flex gap-3 flex-wrap">
          {models.map((model, index) => (
            <CarCard key={index} model={model} />
          ))}
        </div>
      </div>
      <Link href={'/'}>Back home</Link>
    </div>
  );
}

export async function generateStaticParams() {
  const result = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
  );
  const data = await result.json();

  const years = Array.from(
    { length: new Date().getFullYear() - 2014 + 1 },
    (_, i) => 2015 + i
  );

  const params = data.Results.flatMap((vehicle: Car) =>
    years.map((year) => ({
      makeId: vehicle.Make_ID,
      year: year.toString(),
    }))
  );

  return params;
}
