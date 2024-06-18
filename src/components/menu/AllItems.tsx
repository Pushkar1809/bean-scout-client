import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { TbError404 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ItemCard from "./ItemCard";
import { Item } from "../../types/item";
import { Category } from "../../types/category";

const AllItems = ({shopId}: {shopId: string}) => {
  const navigate = useNavigate();
  const { data: items } = useQuery({
		queryKey: [`items-${shopId}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/items/shop/${shopId}`);
			return response.data.data;
		},
	});

  const { data: categories } = useQuery({
		queryKey: [`categories`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/categories`);
			return response.data.data;
		},
	});

  return (
		<div>
			{!items ? (
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
			) : (
				<div>
					<h2 className="text-2xl font-bold mt-8">Top Picks</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
						{items.slice(3).map((item: Item) => (
							<ItemCard key={item._id} item={item} />
						))}
					</div>
					{categories &&
						categories.map((category: Category) => (
							<>
								<div className="w-full h-[1px] rounded-3xl bg-gradient-to-r from-light/20 via-light/30 to-light/20 mt-3" />
								<h2 className="text-2xl font-bold mt-8">
									{category.name}s{" "}
									<span className="text-sm font-light text-light/70">
										{category.description}
									</span>
								</h2>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
									{items
										.filter((item: Item) => item.categoryId === category._id)
										.map((item: Item) => (
											<ItemCard key={item._id} item={item} />
										))}
								</div>
							</>
						))}
				</div>
			)}
		</div>
	);
}

export default AllItems;