import { Outlet } from "react-router-dom";
import "./module/normalize.css";
import "./module/reset.css";
import "antd/dist/antd.css";
import "./module/header.css";
import "./module/footer.css";
import "./module/Card.css";
import "./module/swiper.css";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Outlet />
			<Toaster />
		</>
	);
}

export default App;
