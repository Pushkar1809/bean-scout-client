import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ShopBanner from "../components/shops/ShopBanner";
import ItemCard from "../components/menu/ItemCard";

const Menu = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: items } = useQuery({
		queryKey: [`items-${id}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/items/shop/${id}`);
			return response.data.data;
		},
	});

	const { data: shop } = useQuery({
		queryKey: [`shop-${id}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/shops/${id}`);
			return response.data.data;
		},
	});

	if (!shop)
		return (
			<main className="pt-[10rem] flex flex-col justify-center items-center">
				<TbError404 size={96} className="opacity-70 text-primary" />
				<h2 className="text-2xl font-light ">Café Not Found.</h2>
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
			<ShopBanner shop={shop} />
			<div>
				<h2 className="text-2xl font-bold mt-8">Menu</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
					{items ? (
						items.map((item: any) => (
							<ItemCard key={item._id} item={item} />
						))
					) : (
						<div className="flex flex-col justify-center items-center">
							<TbError404 size={96} className="opacity-70 text-primary" />
							<h2 className="text-2xl font-light ">Café Not Found.</h2>
							<button
								onClick={() => navigate("/")}
								className="mt-4 px-4 py-2 bg-light text-dark rounded-full text-sm flex justify-center items-center gap-1 hover:brightness-110 group">
								<FaArrowLeft
									size={12}
									className="group-hover:-rotate-45 transition-all ease-in-out duration-200"
								/>
								Back to Home
							</button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Menu;
