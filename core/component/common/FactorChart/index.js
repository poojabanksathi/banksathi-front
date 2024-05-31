import React from "react";

import ReactSpeedometer from "react-d3-speedometer";

const FactorChart = ({ ScoreCurrent }) => {
	return (
		<div className="h-[190px]  chartspeedometer">
			<ReactSpeedometer
				value={ScoreCurrent}
				maxSegmentLabels={1}
				segments={100}
			/>

		</div>
	);
};

export default FactorChart;