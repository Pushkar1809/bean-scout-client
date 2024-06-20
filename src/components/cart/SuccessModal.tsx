import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../zustandContext/cartStore";

const SuccessModal = ({setIsSuccessModal}: {setIsSuccessModal: (x: boolean) => void}) => {
  const navigate = useNavigate();
	const clearCart = useCartStore((state) => state.clearCart);

	useEffect(() => {
		const t = setTimeout(() => {
			setIsSuccessModal(false);
			navigate("/shops");
			clearCart();
		}, 3000);
		return () => {
			clearTimeout(t);
		}
	}, []);
  return (
		<div className="absolute w-screen h-screen top-0 left-0 z-[999999] bg-dark/90 flex justify-center items-center">
			<div className="w-[40ch] flex flex-col justify-center items-center">
				<h2 className="text-xl font-bold">Order Successful!</h2>
				<p className="text-sm font-thin text-light/90">Thank you for your purchase!</p>
				<button className="px-2 mt-3 rounded-full w-10/12 py-1 bg-light text-dark mx-auto hover:brightness-110 transition-all ease-in-out duration-200" onClick={() => {
          navigate("/shops");
          setIsSuccessModal(false);
        }}>Order more</button>
			</div>
		</div>
	);
}

export default SuccessModal;