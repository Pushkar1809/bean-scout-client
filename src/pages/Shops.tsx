import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { TbError404 } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ShopBanner from "../components/shops/ShopBanner";
import { Shop } from "../types/shop";
import ShopCard from "../components/shops/ShopCard";

const Shops = () => {
	const { data: shops } = useQuery({
		queryKey: ["shops"],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/shops`);
			return response.data.data;
		},
	});
	const navigate = useNavigate();

	if (!shops || shops.length === 0)
		return (
			<main className="pt-[10rem] flex flex-col justify-center items-center">
				<TbError404 size={96} className="opacity-70 text-primary" />
				<h2 className="text-2xl font-light ">No cafés found nearby.</h2>
				<button
					onClick={() => navigate("/")}
					className="mt-4 px-4 py-2 bg-light text-dark rounded-full text-sm flex justify-center items-center gap-1 hover:brightness-110 group">
					<FaArrowLeft
						size={12}
						className="group-hover:-rotate-45 transition-all ease-in-out duration-200"
					/>
					Back to Home
				</button>
			</main>
		);

	return (
		<main className="pt-[6rem] max-w-[135ch] mx-auto">
			<ShopBanner shop={shops[0]} isFeatured />
			<div>
				<h2 className="text-2xl font-bold mt-8">All Cafés</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
					{shops.map((shop: Shop) => (
						<ShopCard key={shop._id} shop={shop} />
					))}
				</div>
			</div>
		</main>
	);
};

export default Shops;
