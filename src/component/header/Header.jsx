import Nav from "./Nav";
import Search from "./Search";
import logo from "../../picture/logo2.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<nav id="masthead" className="header">
			<div className="logo">
				<NavLink to="/" title="Hex download">
					<img src={logo}></img>
				</NavLink>
			</div>
			<Nav />
			<Search />
		</nav>
	);
}
