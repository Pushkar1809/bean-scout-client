import { TiStarFullOutline } from "react-icons/ti";
import { Item } from "../../types/item";
import { PiPlus } from "react-icons/pi";

const ItemCard = ({ item }: { item: Item }) => {
  return (
		<div className="p-5 flex justify-between items-center gap-2 rounded-lg bg-light/5">
			<div>
				<h3 className="text-xl font-bold">{item.name}</h3>
				<p className="text-sm text-light/80 mb-1">{item.description}</p>
				<div className="flex items-center text-success">
					<TiStarFullOutline />
					<span className="ml-1">{item.rating}</span>
					<span className="text-xs ml-1 text-light/80">
						({item.reviewCount})
					</span>
				</div>
				<p className="font-mono mt-2 text-lg">${item.price}</p>
			</div>
			<div className="w-4/12 relative">
				{/* <img src={item.imageUrl} alt={item.name} /> */}
				<div className=" aspect-video rounded-lg block bg-lime-300/20" />
				<button className="absolute flex justify-center items-center bg-light/80 text-dark px-2 rounded mt-2 z-1 bottom-[-4px] right-[50%] translate-x-[50%]">
					<PiPlus size={15} />
					Add
				</button>
			</div>
		</div>
	);
}

export default ItemCard;