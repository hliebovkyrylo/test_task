import { Car } from '@/typings/car';

interface CarCard {
  model: Car;
}

export const CarCard = ({ model }: CarCard) => {
  return (
    <article className="w-[280px] h-20 flex flex-col justify-between bg-[#333333] p-2 rounded-md">
      <p className="truncate">Make name: {model.Make_Name}</p>
      <p className="truncate">Model name: {model.Model_Name}</p>
    </article>
  );
};
