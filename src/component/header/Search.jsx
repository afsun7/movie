import React, { useContext, useState } from "react";
import {
	SearchOutlined,
	UserOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import "../../module/search.css";
import SearchResults from "./SearchResults";

export default function Search() {
	const value = useContext(UserContext);

	//handle searchbox begin
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	function openSearchBox() {
		setIsSearchOpen(true);
		setMenuOpen(true);
	}
	//handle searchbox end

	// confirm modal begin
	const { confirm } = Modal;

	const showConfirm = () => {
		confirm({
			title: "Do you Want to log out?",
			icon: <ExclamationCircleOutlined />,
			content: "",
			onOk() {
				value.logOut();
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};
	//// confirm modal end

	return (
		<div className="navBtn-container">
			<Button
				type="primary"
				size="large"
				icon={<SearchOutlined />}
				onClick={openSearchBox}
			>
				Search
			</Button>

			{/* search area begin */}
			<SearchResults
				isSearchOpen={isSearchOpen}
				setIsSearchOpen={setIsSearchOpen}
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
			/>
			{/* search area end */}

			{value.user ? (
				<>
					<NavLink to="/profile">
						<Button
							type="primary"
							size="large"
							style={{ textTransform: "capitalize" }}
							icon={<UserOutlined />}
						>
							{value.user.username}
						</Button>
					</NavLink>
					<LogoutOutlined onClick={showConfirm} />
				</>
			) : (
				<NavLink to="/login">
					<Button type="primary" size="large" icon={<UserOutlined />}>
						Sign Up
					</Button>
				</NavLink>
			)}
		</div>
	);
}
