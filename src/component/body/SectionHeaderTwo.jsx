import { Col, Radio, Row } from "antd";
import "../../module/SectionHeader.css";

export default function SectionHeaderTwo(props) {
	function handleClick(action) {
		switch (action) {
			case "day":
				return props.setMediaType("day");
			case "week":
				return props.setMediaType("week");
		}
	}

	return (
		<section className="section-header">
			<h3> {props.textH3}</h3>
			<div className="toggle_section">
				<Row>
					<Col span={12}>
						<Radio.Group defaultValue="Today" buttonStyle="solid">
							<Radio.Button onClick={() => handleClick("day")} value="Today">
								Today
							</Radio.Button>
							<Radio.Button onClick={() => handleClick("week")} value="Week">
								Week
							</Radio.Button>
						</Radio.Group>
					</Col>
				</Row>
			</div>
		</section>
	);
}
