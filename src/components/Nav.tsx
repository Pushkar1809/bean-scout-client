import bsLogo from '../assets/bs.svg';

const Nav = () => {
  return (
		<nav className="bg-dark text-light flex items-center justify-between w-full fixed px-[15rem] py-5 z-[999]">
			<img
				src={bsLogo}
				alt="Logo"
				className="w-[15ch] aspect-auto drop-shadow-[0px_4px_8px_#F596253a] pb-1"
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
			</div>
		</nav>
	);
}

export default Nav;