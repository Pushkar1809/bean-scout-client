import { Shop } from "../../types/shop";
import { TiStarFullOutline } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { PiCoffeeBeanFill } from "react-icons/pi";


interface Props { 
	shop: Shop;
	isFeatured?: boolean;
}

const ShopBanner = ({ shop, isFeatured=false }: Props) => {
  return (
		<div className="w-full bg-light/10 aspect-[8/3] rounded-3xl p-8 relative z-0 hidden md:block">
			{/* <img src={shop.imageUrl} alt={shop.name} /> */}
			<div className="w-full h-[15ch] bg-gradient-to-t from-dark/80 to-dark/0 rounded-b-3xl absolute bottom-0 left-0 -z-1" />
			{isFeatured && (
				<div className="absolute top-8 left-8 bg-primary/30 text-primary flex items-center px-2 py-1 rounded-md text-sm font-bold gap-1">
					<PiCoffeeBeanFill />
					Featured
				</div>
			)}
			<div className="absolute bottom-0 left-0 w-full flex justify-between items-end z-1 p-8">
				<div>
					<h2 className="text-2xl font-bold">{shop.name}</h2>
					<p className="text-sm text-light/85 font-light max-w-[50ch] ">
						{shop.description}
					</p>
					<div className="flex items-center gap-1 bg-success/70 text-white w-fit px-2 py-1 rounded-lg text-sm font-semibold mt-3">
						<TiStarFullOutline />
						{shop.rating}{" "}
						<span className="text-xs font-md">
							({shop.reviewCount} reviews)
						</span>
					</div>
				</div>
				<div className="flex items-center gap-1 text-light/85 max-w-[40ch]">
					<FaLocationDot />
					{shop.address}
				</div>
			</div>
		</div>
	);
}

export default ShopBanner;