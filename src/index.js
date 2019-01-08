import React from "react";
import { render } from "react-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MySlider = Slider.createSliderWithTooltip(Slider);

// just some cosmetics
function prettyInt(x) {
  return Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// debug utility
function log(value) {
  console.log({
    value,
    curvedValue: sliderCurve(value)
  });
}

// change these to whatever curve function you need!
const sliderCurve = Math.exp;
const inverseCurve = Math.log;

const App = () => (
  <div style={{ width: 400, margin: 50 }}>
    <p style={{ marginBottom: "2em" }}>
      Exponential slider from 1 to 1,000,000
    </p>
    <MySlider
      min={inverseCurve(1)}
      max={inverseCurve(1000000)}
      marks={{
        [inverseCurve(1)]: prettyInt(1),
        [inverseCurve(10)]: prettyInt(10),
        [inverseCurve(100)]: prettyInt(100),
        [inverseCurve(1000)]: prettyInt(1000),
        [inverseCurve(10000)]: prettyInt(10000),
        [inverseCurve(100000)]: prettyInt(100000),
        [inverseCurve(1000000)]: prettyInt(1000000)
      }}
      step={(inverseCurve(1000000) - inverseCurve(1)) / 100} // 100 steps in range
      tipFormatter={value => prettyInt(sliderCurve(value))}
      onChange={log}
    />
  </div>
);

render(<App />, document.getElementById("root"));
