import { Make } from "@/typings/make";
import Link from "next/link";

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

  const models: Make[] = await fetchModels(makeId, year);

  return (
    <div>
      <h1>Vehicles</h1>
      <div className="flex gap-3">
      {models.map((model, index) => (
        <article key={index} className="w-[300px] h-20 flex flex-col justify-between bg-[#333333] p-2 rounded-md">
          <p>{model.Make_Name}</p>
          <p>{model.Model_Name}</p>
        </article>
      ))}
      </div>
      <Link href={"/"}>Back home</Link>
    </div>
  );
}

export async function generateStaticParams() {
  const result = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await result.json();

  const years = Array.from(
    { length: new Date().getFullYear() - 2014 + 1 },
    (_, i) => 2015 + i
  );

  const params = data.Results.flatMap((vehicle: Make) =>
    years.map((year) => ({
      makeId: vehicle.Make_ID,
      year: year.toString(),
    }))
  );

  return params;
}
