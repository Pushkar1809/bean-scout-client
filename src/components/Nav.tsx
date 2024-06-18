import bsLogo from '../assets/bs.svg';
import { IoBagHandle } from "react-icons/io5";
import { useCartStore } from '../zustandContext/cartStore';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
	const cart = useCartStore((state) => state.cart);
	const navigate = useNavigate();
  return (
		<nav className="bg-dark text-light flex items-center justify-between w-full fixed px-[15rem] py-5 z-[999]">
			<img
				src={bsLogo}
				alt="Logo"
				className="w-[15ch] aspect-auto drop-shadow-[0px_4px_8px_#F596253a] pb-1 cursor-pointer"
				onClick={() => navigate("/")}
			/>
			<div className="min-w-[20ch] flex gap-5 items-center justify-end">
				<a
					href="/shops"
					className="opacity-80 hover:opacity-100 hover:text-primary text-sm font-light transition-all ease-in-out duration-200">
					All Shops
				</a>
				<button className="bg-light text-dark px-3 py-1 rounded hover:brightness-110 transition-all ease-out duration-200 text-sm">
					Sign In
				</button>
				<button onClick={() => navigate("/cart")} className="relative">
					<IoBagHandle size={24} className={`${cart.length > 0 && "text-primary"}`} />
					{cart.length > 0 && (
						<div className="w-4 text-xs text-dark font-semibold rounded-full bg-primary border-2 border-dark absolute -bottom-2 -right-2 p-0 aspect-square">
							{cart.length}
						</div>
					)}
				</button>
			</div>
		</nav>
	);
}

export default Nav;