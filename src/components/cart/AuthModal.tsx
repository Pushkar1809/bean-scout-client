import axios from "axios";
import { API_BASE_URL } from "../../constants";
import google from "../../assets/google.svg";

const AuthModal = ({
	setIsAuthModal,
}: {
	setIsAuthModal: (x: boolean) => void;
}) => {
	const handleSignin = async () => {
		const res = await axios.post(`${API_BASE_URL}/user/auth`);
		const { url } = res.data;
		window.location.href = url;
		setIsAuthModal(false);
	};

	return (
		<div className="absolute w-screen h-screen bg-dark/60 top-0 left-0 flex flex-col justify-center items-center z-[999999]">
			<h3 className="text-xl font-bold">
				Seems like you haven't logged in yet.
			</h3>
			<p className="text-sm font-light text-light/90">
				To access cart sign in.
			</p>
			<div className="flex flex-col w-[30ch] p-3 rounded-xl bg-dark border border-light/20 items-center mt-3">
				<h2 className="text-lg font-bold">Sign In</h2>
				<button
					onClick={handleSignin}
					className="px-2 py-1 my-2 rounded-full bg-light text-dark text-sm w-full flex justify-center items-center">
					<img src={google} alt="google" className="w-7 aspect-square" />
					Continue with Google
				</button>
			</div>
		</div>
	);
};

export default AuthModal;