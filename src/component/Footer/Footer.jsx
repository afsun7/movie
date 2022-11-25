import React from "react";
import { Button } from "antd";

export default function Footer() {
	return (
		<footer className="Footer">
			<div> Designed with 💙, all the rights reserved for Hex Download. </div>
			<div className="FooterLinks">
				<Button type="primary">About Us</Button>
				<Button type="primary"> Contact Us </Button>
				<Button type="primary">Reports</Button>
			</div>
		</footer>
	);
}
