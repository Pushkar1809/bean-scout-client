import hero from "../assets/hero.jpg";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../zustandContext/userStore";

const Home = () => {
	const [searchParams] = useSearchParams();
	const setUser = useUserStore((state) => state.setUser);

	const { data: user } = useQuery(
		{
			queryKey: ["user"],
			queryFn: async () => {
				const response = await axios.get(
					`${API_BASE_URL}/user/${searchParams.get("userId")}`,
				);
				return response.data.data;
			},
			enabled: !!searchParams.get("userId"),
		},
	);

	const { data: shops } = useQuery({
		queryKey: ["shops"],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/shops`);
			return response.data.data;
		},
	});

	const { data: items } = useQuery({
		queryKey: ["items"],
		queryFn: async () => {
			const response = await axios.get(`${API_BASE_URL}/items`);
			return response.data.data;
		},
	});

	useEffect(() => {
		if (searchParams.get("userId")) {
			localStorage.setItem("userId", searchParams.get("userId") as string);
		}
		if (user) {
			setUser(user);
		}
	}, [user]);

	return (
		<main className="w-screen h-screen relative bg-dark text-light pt-[6rem] flex flex-col md:flex-row text-center md:text-left items-center justify-start md:justify-between max-w-[135ch] mx-auto overflow-hidden">
			<div className="absolute w-[70vh] aspect-video rounded-[30vw] rotate-60 bg-primary/60 blur-3xl bottom-[-30vh] left-[40%] translate-x-[-50%]" />
			<div className="px-3 md:px-0 mt-10 md:mt-0 ">
				<div>
					<h1 className="text-[2.5rem] md:text-[6rem] leading-[3rem] md:leading-[5.5rem] font-bold">
						Find the <span className="text-primary">best coffee</span> in town!
					</h1>
					<p className="text-xs md:text-lg font-light text-light/90 w-8/12 mt-2 mx-auto md:mx-0">
						Browse through the awesome selection of cafés in your neighbourhood,
						offering fresh coffee and finger-licking good food.
					</p>
				</div>
				<div className="flex justify-center md:justify-start items-center gap-3 my-7 md:my-10">
					{shops && shops.length > 0 && (
						<div className="border border-primary/10 flex md:flex-col items-center justify-center w-5/12 md:w-3/12 gap-2 md:gap-0 py-3 rounded-lg bg-gradient-to-r from-primary/10 via-primary/0 to-primary/10">
							<p className="text-xl md:text-3xl font-semibold text-primary">
								{shops.length}
							</p>
							<p className="text-light/90">Cafés</p>
						</div>
					)}
					{items && items.length > 0 && (
						<div className="border border-primary/10 flex md:flex-col items-center justify-center w-5/12 gap-2 md:gap-0 md:w-3/12 py-3 rounded-lg bg-gradient-to-r from-primary/10 via-primary/0 to-primary/10">
							<p className="text-xl md:text-3xl font-semibold text-primary">
								{items.length}+
							</p>
							<p>Products</p>
						</div>
					)}
				</div>
				<a href="/shops">
					<button className="px-5 bg-light py-1.5 md:py-2 rounded-full text-dark font-semibold flex items-center gap-1 group mx-auto md:mx-0">
						Browse Cafés
						<FaArrowRight
							size={12}
							className="group-hover:-rotate-45 transition-transform ease-in-out duration-200"
						/>
					</button>
				</a>
			</div>
			<img
				src={hero}
				alt="Coffee"
				className="w-5/12 rounded-xl md:rounded-full rotate-6 animate-breathe mt-10 md:m-0"
			/>
		</main>
	);
};

export default Home;
