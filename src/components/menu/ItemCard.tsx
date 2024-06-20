import { TiStarFullOutline } from "react-icons/ti";
import { Item } from "../../types/item";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useCartStore, CartItem } from "../../zustandContext/cartStore";
import { useMemo } from "react";

const ItemCard = ({ item }: { item: Item }) => {
	const cart = useCartStore((state) => state.cart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const addToCart = useCartStore((state) => state.addToCart);

	const itemInCart = useMemo<boolean>(() => !!cart.find((i) => i.itemId === item._id), [cart, item._id]);

  return (
		<div className="p-5 flex justify-between items-center gap-2 rounded-lg bg-light/5">
			<div>
				<h3 className="text-xl font-bold">{item.name}</h3>
				<p className="text-sm text-light/80 mb-1 hidden md:block">{item.description}</p>
				<div className="flex items-center text-success">
					<TiStarFullOutline />
					<span className="ml-1">{item.rating}</span>
					<span className="text-xs ml-1 text-light/80">
						({item.reviewCount})
					</span>
				</div>
				<p className="font-mono mt-2 text-lg">${item.price}</p>
			</div>
			<div className="w-6/12 md:w-4/12 relative">
				{/* <img src={item.imageUrl} alt={item.name} /> */}
				<div className="aspect-video rounded-lg block bg-lime-300/20" />
				{itemInCart ? (
					<div className="flex justify-center items-center gap-2 rounded bg-light/80 text-dark border border-success/50 absolute mt-2 z-1 bottom-[-4px] right-[50%] translate-x-[50%]">
						<button
							onClick={() => removeFromCart(item._id)}
							className="hover:bg-danger/90 hover:text-light px-1 aspect-square border-r border-dark/30 rounded-l transition-colors ease-in-out duration-200">
							<PiMinus size={15} />
						</button>
						<p className="text-center">
							{
								cart.filter(
									(cartItem: CartItem) => cartItem.itemId === item._id,
								)[0].quantity
							}
						</p>
						<button
							onClick={() => addToCart(item._id)}
							className="hover:bg-success/90 hover:text-light px-1 aspect-square border-l border-dark/30 rounded-r transition-colors ease-in-out duration-200">
							<PiPlus size={15} />
						</button>
					</div>
				) : (
					<button
						onClick={() => addToCart(item._id)}
						className="absolute flex justify-center items-center bg-light/80 text-dark px-2 rounded mt-2 z-1 bottom-[-4px] right-[50%] translate-x-[50%]">
						<PiPlus size={15} />
						Add
					</button>
				)}
			</div>
		</div>
	);
}

export default ItemCard;