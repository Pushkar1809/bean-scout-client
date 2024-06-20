import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ShopBanner from "../components/shops/ShopBanner";
import { Category } from "../types/category";
import { useEffect, useState } from "react";
import AllItems from "../components/menu/AllItems";
import CategoryItems from "../components/menu/CategoryItems";
import TopPicks from "../components/menu/TopPicks";

const Menu = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = useState<
		"all" | "top" | "food" | "drink"
	>("all");

	const { data: shop } = useQuery({
		queryKey: [`shop-${id}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/shops/${id}`);
			return response.data.data;
		},
	});

	const { data: categories } = useQuery({
		queryKey: [`categories-${id}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/categories`);
			return response.data.data;
		},
	});

	useEffect(() => {
		if (!id) {
			navigate("/shops");
		}
	}, [id]);

	if (!shop)
		return (
			<main className="pt-[10rem] max-w-[135ch] flex flex-col justify-center items-center mx-auto">
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
		<main className="pt-[6rem] max-w-[135ch] mx-auto px-5 md:px-0">
			<ShopBanner shop={shop} />
			<div className="flex items-center gap-2 mb-6 md:hidden">
				<h2 className="text-[3rem] font-bold">{shop.name}</h2>
			</div>
			<div className="flex items-center gap-2">
				<button
					onClick={() => setActiveCategory("all")}
					className={`rounded-full px-3 py-1 text-sm bg-light/15 ${
						activeCategory === "all" && "bg-primary text-dark font-semibold"
					}`}>
					All
				</button>
				<button
					onClick={() => setActiveCategory("top")}
					className={`rounded-full px-3 py-1 text-sm bg-light/15 ${
						activeCategory === "top" && "bg-primary text-dark font-semibold"
					}`}>
					Top Picks
				</button>
				{categories && categories.map((category: Category) => (
					<button
						key={category._id}
						onClick={() =>
							setActiveCategory(category.name.toLowerCase() as "food" | "drink")
						}
						className={`rounded-full px-3 py-1 text-sm bg-light/15 ${
							activeCategory === category.name.toLowerCase() &&
							"bg-primary text-dark font-semibold"
						}`}>
						{category.name}
					</button>
				))}
			</div>
			{activeCategory === "all" && id ? (
				<AllItems shopId={id} />
			) : activeCategory === "top" && id ? (
				<TopPicks shopId={id} />
			) : (
				<>
					{categories &&
						categories.map((category: Category) => (
							<div key={category._id}>
								{activeCategory === category.name.toLowerCase() && id && (
									<CategoryItems shopId={id} categoryId={category._id} />
								)}
							</div>
						))}
				</>
			)}
		</main>
	);
};

export default Menu;
