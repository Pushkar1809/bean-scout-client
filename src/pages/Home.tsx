import hero from "../assets/hero.jpg";

const Home = () => {
	return (
		<main className="bg-dark text-light pt-[6rem] flex items-center justify-between">
				<div>
					<div>
						<h1>Find the best coffee in town!</h1>
						<p>Discover the best coffee shops in your area</p>
					</div>
					<div>
						<div>shops</div>
						<div>items</div>
					</div>
					<button>Explore Cafés</button>
				</div>
				<img src={hero} alt="Coffee" className="w-6/12 max-h-[calc(100vh - 2.5rem)]"/>
		</main>
	);
};

export default Home;
