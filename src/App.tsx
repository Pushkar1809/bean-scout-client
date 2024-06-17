import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './pages/Loader';
import Nav from "./components/Nav";

const Home = lazy(() => import('./pages/Home'));
const Shops = lazy(() => import('./pages/Shops'));
const Menu = lazy(() => import('./pages/Menu'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
  return (
		<>
			<Nav />
			<Routes>
				<Route
					path="/"
					element={
						<Suspense fallback={<Loader />}>
							<Home />
						</Suspense>
					}>
					<Route
						path="shops"
						element={
							<Suspense fallback={<Loader />}>
								<Shops />
							</Suspense>
						}>
						<Route
							path=":id"
							element={
								<Suspense fallback={<Loader />}>
									<Menu />
								</Suspense>
							}/>
					</Route>
					<Route
						path="cart"
						element={
							<Suspense fallback={<Loader />}>
								<Cart />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App
