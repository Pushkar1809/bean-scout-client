import { useNavigate } from "react-router-dom";

const SuccessModal = ({setIsSuccessModal}: {setIsSuccessModal: (x: boolean) => void}) => {
  const navigate = useNavigate();
  return (
		<div className="absolute w-screen h-screen top-0 left-0 z-[999999]">
			<div className="w-[40ch] flex flex-col justify-center items-center">
				<h2 className="text-xl font-bold">Order Successful!</h2>
				<p className="text-sm font-thin text-light/90">Thank you for your purchase!</p>
				<button className="px-2 rounded-full w-10/12 py-1 bg-light text-dark mx-auto hover:brightness-110 transition-all ease-in-out duration-200" onClick={() => {
          navigate("/shops");
          setIsSuccessModal(false);
        }}>Order more</button>
			</div>
		</div>
	);
}

export default SuccessModal;