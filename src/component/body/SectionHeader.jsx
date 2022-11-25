import { Col, Radio, Row } from "antd";
import "../../module/SectionHeader.css";

export default function SectionHeader(props) {
	function handleClick(action) {
		switch (action) {
			case "movie":
				return props.setMediaType("movie");
			case "tv":
				return props.setMediaType("tv");
		}
	}

	return (
		<section className="section-header">
			<h3> {props.textH3}</h3>
			<div className="toggle_section">
				<Row>
					<Col span={12}>
						<Radio.Group defaultValue="Movies" buttonStyle="solid">
							<Radio.Button onClick={() => handleClick("movie")} value="Movies">
								Movies
							</Radio.Button>
							<Radio.Button onClick={() => handleClick("tv")} value="tv">
								TV
							</Radio.Button>
						</Radio.Group>
					</Col>
				</Row>
			</div>
		</section>
	);
}
