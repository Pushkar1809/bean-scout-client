import { FaArrowLeft } from "react-icons/fa";
import ItemCard from "../components/cart/ItemCard";
import { useCartStore } from "../zustandContext/cartStore";
import { SiBuymeacoffee } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Cart = () => {
	const [total, setTotal] = useState(0);
	const cart = useCartStore((state) => state.cart);
	const navigate = useNavigate();

	if (cart.length === 0) {
		return (
			<main className="pt-[10rem] flex flex-col justify-center items-center">
				<SiBuymeacoffee size={56} className="text-primary animate-breathe" />
				<h2 className="font-semibold text-lg">Your Basket is Empty</h2>
				<p className="text-sm font-light text-light/70">Looks like you haven't added anything to your basket yet.</p>
				<button onClick={() => navigate("/shops")} className="bg-light rounded-full px-4 py-2 text-sm text-dark flex justify-center items-center gap-1 hover:brightness-110 transition-all ease-in-out duration-200 group mt-3"><FaArrowLeft className="group-hover:-rotate-45 transition-all ease-in-out duration-200" size={12} />Explore Cafés</button>
			</main>
		);
	}

	return (
		<main className="pt-[6rem] max-w-[135ch] flex flex-col justify-center items-center mx-auto">
			{/* Cart */}
			<div className="flex justify-between items-start gap-5 w-full">
				<div className="border border-light/30 border-dashed p-8 w-8/12 rounded-xl">
					<h1 className="text-3xl font-bold">Your Basket</h1>
					<p className="font-light text-light/80">{cart.length} products</p>
					<div className="flex flex-col items-start gap-3 my-5 max-h-[65vh] overflow-scroll">
						{cart.map((item) => (
							<ItemCard
								key={item.itemId}
								itemId={item.itemId}
								setTotal={setTotal}
							/>
						))}
					</div>
					<button
						onClick={() => navigate("/shops")}
						className="bg-light px-2 py-1 text-sm text-dark rounded-full font-semibold">
						+ Add more items
					</button>
				</div>

				{/* Cart Summary */}
				<div className="w-4/12 bg-light/10 p-8 rounded-xl">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Basket Summary</h2>
						<p className="font-light text-light/80 text-sm">
							{cart.length} products
						</p>
					</div>
					<div className="flex justify-between items-center mt-3">
						<p className="font-light">Delivery</p>
						<p className="font-semibold text-success">Free</p>
					</div>
					<div className="flex justify-between items-center">
						<p>Total</p>
						<p>
							<span className="line-through">${total}</span>
							<span className="text-success font-semibold ml-2">$0.0</span>
						</p>
					</div>
					<p className="bg-success/30 text-sm font-light text-success w-fit px-2 rounded-full">
						Pomotion Applied <span className="font-bold">FREE4ALL</span>
					</p>
					<button className="bg-primary text-dark rounded-full px-4 py-2 mt-5 w-full font-semibold">
						Checkout
					</button>
				</div>
			</div>

			{/* Checkout */}
		</main>
	);
};

export default Cart;
