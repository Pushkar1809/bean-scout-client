import { useEffect, useMemo } from "react";
import { CartItem, useCartStore } from "../../zustandContext/cartStore";
import { PiMinus, PiPlus } from "react-icons/pi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import { FaShop } from "react-icons/fa6";

const ItemCard = ({ itemId, setTotal }: { itemId: string, setTotal: (t: (prev: number) => number) => void }) => {
	const cart = useCartStore((state) => state.cart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const addToCart = useCartStore((state) => state.addToCart);

	const { data: item } = useQuery({
		queryKey: [`item-${itemId}`],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/items/${itemId}`);
			return response.data.data;
		},
	});

	const { data: shop } = useQuery({
		queryKey: [`shop-${item?.shopId}`],
		queryFn: async () => {
			if (!item) return null;
			const response = await axios.get(`${API_BASE_URL}/shops/${item?.shopId}`);
			return response.data.data;
		},
	});

	const quantity = useMemo(() => {
		if (!item) return 0;
		return cart.filter((cartItem: CartItem) => cartItem.itemId === item._id)[0]
			.quantity;
	}, [cart, item?._id]);

	useEffect(() => {
		if (item) {
			setTotal((prev: number) => prev + item.price * quantity);
		}
		return () => {
			if (item) {
				setTotal((prev: number) => prev - item.price * quantity);
			}
		}
	}, [item, quantity, setTotal])

	if (!item) return null;

	return (
		<div className="p-5 flex justify-between items-center gap-2 rounded-xl bg-light/10 w-full">
			<div>
				{shop && (
					<h2 className="bg-primary rounded-full px-2 text-dark font-semibold w-fit flex justify-center items-center gap-1 text-sm">
						<FaShop size={15}></FaShop>
						{shop.name}
					</h2>
				)}
				<h3 className="text-xl font-bold">{item.name}</h3>
				<p className="text-sm text-light/80 mb-1">{item.description}</p>
			</div>
			<div className="w-4/12 relative flex flex-col md:flex-row justify-center md:justify-end items-center gap-1 md:gap-10">
				<div className="flex justify-center items-center gap-2 rounded bg-light/80 text-dark border border-success/50">
					<button
						onClick={() => removeFromCart(item._id)}
						className="hover:bg-danger/90 hover:text-light px-1 aspect-square border-r border-dark/30 rounded-l transition-colors ease-in-out duration-200">
						<PiMinus size={15} />
					</button>
					<p className="text-center">{quantity}</p>
					<button
						onClick={() => addToCart(item._id)}
						className="hover:bg-success/90 hover:text-light px-1 aspect-square border-l border-dark/30 rounded-r transition-colors ease-in-out duration-200">
						<PiPlus size={15} />
					</button>
				</div>
				<p className="font-mono text-lg">${item.price * quantity}</p>
			</div>
		</div>
	);
};

export default ItemCard;
