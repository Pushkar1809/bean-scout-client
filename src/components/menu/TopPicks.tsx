import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { Item } from "../../types/item";
import ItemCard from "./ItemCard";

const TopPicks = ({ shopId }: { shopId: string }) => {
  const { data: items } = useQuery({
		queryKey: [`items-${shopId}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/items/shop/${shopId}`);
			return response.data.data;
		},
	});
  return (
		<>
			<h2 className="text-2xl font-bold mt-8">Top Picks</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
				{items.slice(3).map((item: Item) => (
					<ItemCard key={item._id} item={item} />
				))}
			</div>
		</>
	);
}

export default TopPicks;