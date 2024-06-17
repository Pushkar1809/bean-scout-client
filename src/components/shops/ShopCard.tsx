import { useNavigate } from "react-router-dom";
import { Shop } from "../../types/shop";
import { TiStarFullOutline } from "react-icons/ti";

const ShopCard = ({ shop }: { shop: Shop }) => {
  const navigate = useNavigate();
  return (
		<div className="w-full bg-light/5 rounded-3xl p-6 relative z-0 cursor-pointer hover:scale-110 transition-all ease-in-out duration-200" onClick={() => navigate(`/shops/${shop._id}`)}>
			{/* <img src={shop.imageUrl} alt={shop.name} /> */}
			<div className="w-full aspect-video bg-light/20 block rounded-xl" />
			<div className="flex justify-between items-end gap-3 mt-3">
				<div>
					<h3 className="text-2xl font-bold">{shop.name}</h3>
					<p className="text-sm font-light leading-5 text-light/70">
						{shop.description}
					</p>
				</div>
				<div className="flex flex-col items-center text-xs w-3/12 gap-1">
					<div className="flex justify-start items-center font-semibold text-base gap-1 bg-success/70 text-white px-2 py-1 rounded-lg">
						<TiStarFullOutline />
						<span>{shop.rating}</span>
					</div>
					<span>({shop.reviewCount})</span>
				</div>
			</div>
		</div>
	);
}

export default ShopCard;