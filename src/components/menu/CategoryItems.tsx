import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "./ItemCard";
import { Item } from "../../types/item";
import { TbError404 } from "react-icons/tb";

const CategoryItems = ({ shopId, categoryId }: { shopId: string; categoryId: string }) => {
  const { data: items, isLoading } = useQuery({
    queryKey: [`items-${shopId}-${categoryId}`],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/items/shop/${shopId}?categoryId=${categoryId}`);
      return response.data.data;
    },
  });

  const { data: category } = useQuery({
    queryKey: [`category-${categoryId}`],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
      return response.data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!category || !items) return <div>  
		<TbError404 size={96} className="opacity-70 text-primary" />
		<h2 className="text-2xl font-light ">No Products here.</h2>
	</div>;

  return (
		<>
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
	);
}

export default CategoryItems;