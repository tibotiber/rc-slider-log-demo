import React from "react";
import { render } from "react-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";

const Handle = Slider.Handle;

const log2 = n => Math.log2(n);
const antiLog2 = n => Math.pow(2, n);

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  const logValue = log2(value);
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={logValue}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const generateMark = x => {
  return antiLog2(x);
};

const values = [1, 2, 3, 4, 5];

const generateMarks = () => {
  const result = {};
  values.forEach(value => {
    result[generateMark(value)] = value;
  });
  return result;
};

const marks = generateMarks();

function log(value) {
  console.log("originValue", value, "log2", log2(value));
}

const wrapperStyle = { width: 400, margin: 50 };
const App = () => (
  <div style={wrapperStyle}>
    <Slider
      min={values[0]}
      max={generateMark(values[values.length - 1])}
      marks={marks}
      step={1}
      onChange={log}
      defaultValue={values[0]}
      handle={handle}
    />
  </div>
);

render(<App />, document.getElementById("root"));
