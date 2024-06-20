import axios from "axios";
import google from "../assets/google.svg";
import { API_BASE_URL } from "../constants";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { useUserStore } from "../zustandContext/userStore";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/user";
import { LuLoader2 } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { IoIosPin } from "react-icons/io";


const AuthModal = ({ setIsAuthModal }: { setIsAuthModal: (x: boolean) => void }) => {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const [address, setAddress] = useState<string>(user?.address || "");
	const [editMode, setEditMode] = useState<boolean>(false);
	const queryClient = useQueryClient();

const updateAddressSrc = async ({address, uid}: {address: string; uid: string;}): Promise<User> => {
		const res = await axios.put(`${API_BASE_URL}/user/${uid}`, { address });
		setUser(res.data.data);
		return res.data.data;
	};

	const { mutate: updateAddress, isPending } = useMutation({
		mutationFn: updateAddressSrc,
		onSuccess: (_) => {
			setEditMode(false);
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const handleSignin = async () => {
		const res = await axios.post(`${API_BASE_URL}/user/auth`);
		const { url } = res.data;
		window.location.href = url;
		setIsAuthModal(false);
	}

	useEffect(() => {
		if(!user || !user.address) {
			setEditMode(true);
		}
	}, [user])

  return (
		<div className="absolute w-[30ch] p-3 rounded-xl bg-dark border border-light/20 z-[9999] top-[115%] right-0 text-light flex flex-col justify-center items-start">
			<div className="flex justify-between items-start w-full">
				<h2 className="text-lg font-bold">
					{!!user ? `Hi, ${user.name.split(" ")[0]}` : "Sign In"}
				</h2>
				<button
					className="bg-transparent p-0 m-0"
					onClick={() => setIsAuthModal(false)}>
					<IoIosClose size={20} />
				</button>
			</div>

			{user ? (
				<label className="w-full mt-3">
					<div className="flex justify-start items-center gap-1">
						<p className="text-sm font-light uppercase flex items-center gap-1 text-light/80">
							<IoIosPin size={20} />
							Delievery Address
						</p>
						{!editMode && (
							<button onClick={() => setEditMode(true)} className="bg-transparent p-0 m-0 group">
								<MdEdit
									size={15}
									className="hover:rotate-180 hover:text-primary transition-all ease-in-out duration-200"
								/>
							</button>
						)}
					</div>
					{editMode || !user.address ? (
						<>
							<textarea
								className="w-full bg-light/10 p-1 rounded text-light text-sm focus:outline-none"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<button
								onClick={() => updateAddress({ address, uid: user._id })}
								className="bg-light rounded-lg text-dark hover:brightness-110 transition-all ease-in-out duration-200"
								disabled={!address}>
								{isPending ? (
									<LuLoader2 size={25} className="bg-transparent p-0 m-0" />
								) : (
									<IoIosCheckmark
										size={25}
										className="bg-transparent p-0 m-0"
									/>
								)}
							</button>
						</>
					) : (
						<p className="ml-6">{user.address}</p>
					)}
				</label>
			) : (
				<button
					onClick={handleSignin}
					className="px-2 py-1 my-2 rounded-full bg-light text-dark text-sm w-full flex justify-center items-center">
					<img src={google} alt="google" className="w-7 aspect-square" />
					Continue with Google
				</button>
			)}
		</div>
	);
}

export default AuthModal;