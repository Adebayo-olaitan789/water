import React, { useState } from "react";
import "./HeaterTubeSimulation.css";

function HeaterTubeSimulation() {
  // State variables for form inputs
  const [inletPressure, setInletPressure] = useState(750);
  const [inletVolume, setInletVolume] = useState(1);
  const [inletTemp, setInletTemp] = useState(35);
  const [inletRH, setInletRH] = useState(0.9);

  const [stpPressure, setStpPressure] = useState(760);
  const [stpVolume, setStpVolume] = useState(22.4);
  const [stpTemp, setStpTemp] = useState(0);

  const [outletPressure, setOutletPressure] = useState(760);
  const [outletTemp, setOutletTemp] = useState(0);

  // State variables for results
  const [results, setResults] = useState({
    waterVapourInlet: "",
    dryAirInlet: "",
    waterVapourOutlet: "",
    dryAirOutlet: "",
    condensedWater: "",
    waterFlowRate: "",
  });

//const relevantData = [
//  { temperature: 0, pressure: 0.00061165 },
//  { temperature: 50, pressure: 12.352 },
//  { temperature: 100, pressure: 101.325 },
//  { temperature: 150, pressure: 448.06 },
//  { temperature: 200, pressure: 1554.9 },
//  { temperature: 250, pressure: 6101.6 },
//  { temperature: 300, pressure: 28000 },
//  { temperature: 350, pressure: 104000 },
//  { temperature: 373.95, pressure: 101325 },
//  { temperature: 400, pressure: 117000 },
//];

const relevantData =[{temperature: 0.01, pressure: 0.00061165}, {temperature: 5, pressure: 0.00087258},
                       {temperature: 10, pressure: 0.0012282}, {temperature: 15, pressure: 0.0017058}, 
					   {temperature: 20, pressure: 0.0023393}, {temperature: 25, pressure: 0.0031699},
					   {temperature: 30, pressure: 0.004247}, {temperature: 35, pressure: 0.005629},
					   {temperature: 40, pressure: 0.0073849}, {temperature: 45, pressure: 0.009595}, 
					   {temperature: 50, pressure: 0.012352}, {temperature: 55, pressure: 0.015762}, 
					   {temperature: 60, pressure: 0.019946}, {temperature: 65, pressure: 0.025042}, 
					   {temperature: 70, pressure: 0.031201}, {temperature: 75, pressure: 0.038595}, 
					   {temperature: 80, pressure: 0.047414}, {temperature: 85, pressure: 0.057867}, 
					   {temperature: 90, pressure: 0.070182}, {temperature: 95, pressure: 0.084608}, 
					   {temperature: 100, pressure: 0.10142}, {temperature: 110, pressure: 0.14338}, 
					   {temperature: 120, pressure: 0.19867}, {temperature: 130, pressure: 0.27028}, 
					   {temperature: 140, pressure: 0.36154}, {temperature: 150, pressure: 0.47616}, 
					   {temperature: 160, pressure: 0.61823}, {temperature: 170, pressure: 0.79219}, 
					   {temperature: 180, pressure: 1.0028}, {temperature: 190, pressure: 1.2552}, 
					   {temperature: 200, pressure: 1.5549}, {temperature: 210, pressure: 1.9077}, 
					   {temperature: 220, pressure: 2.3196}, {temperature: 230, pressure: 2.7971}, 
					   {temperature: 240, pressure: 3.3469}, {temperature: 250, pressure: 3.9762}, 
					   {temperature: 260, pressure: 4.6923}, {temperature: 270, pressure: 5.503}, 
					   {temperature: 280, pressure: 6.4166}, {temperature: 290, pressure: 7.4418}, 
					   {temperature: 300, pressure: 8.5879}, {temperature: 310, pressure: 9.8651}, 
					   {temperature: 320, pressure: 11.284}, {temperature: 330, pressure: 12.858}, 
					   {temperature: 340, pressure: 14.601}, {temperature: 350, pressure: 16.529}, 
					   {temperature: 360, pressure: 18.666}, {temperature: 370, pressure: 21.044}, 
					   {temperature: 373.95, pressure: 22.064}];

// Function to estimate saturation vapor pressure for a given temperature
const sat_vap_p = (t) => {
  const p_table = relevantData.map(item => item.pressure);
  const t_table = relevantData.map(item => item.temperature);

  if (t >= 0.01 && t < 373.95) {
    // Interpolation
    const index1 = t_table.findIndex(temp => temp <= t);
    const index2 = t_table.findIndex(temp => temp > t);
    const y1 = p_table[index1];
    const y2 = p_table[index2];
    const x1 = t_table[index1];
    const x2 = t_table[index2];

    const y = ((t - x1) * ((y2 - y1) / (x2 - x1))) + y1;
    return y * 7500.62; // Scale to appropriate units
  } else if (t >= 373.95) {
    // Extrapolation
    const y = ((t - 379.95) * ((22.064 - 21.044) / (373.95 - 370))) + 22.064;
    return y * 7500.62; // Scale to appropriate units
  } else if (t < 0.01) {
    // Extrapolation
    const y = ((t - 0.01) * ((0.00087258 - 0.00061165) / (5 - 0.01))) + 0.00061165;
    return y > 0 ? y * 7500.62 : 0; // Ensure non-negative
  }
  return 0; // Default case
};

const flowCalc = (p1, v1, t1, rh, t2, p2, p, v, t) => {
  // Convert temperature to Kelvin
  const t1_K = t1 + 273.15;
  const t2_K = t2 + 273.15;
  const t_K = t + 273.15;

  // Mole fractions (inlet air)
  const y1_wat_vap = (rh * sat_vap_p(t1) / p1); // Mole fraction of water vapor in inlet air
  const y1_dry_air = (1 - y1_wat_vap); // Mole fraction of dry air (in inlet air)

  // Volumetric flow rate
  const m1 = (p1 * v1 / t1_K) / (p * v / t_K); // Volumetric flow rate of dry air at inlet (kmol/min)

  // Mole fractions (outlet air)
  const y2_wat_vap = (sat_vap_p(t2) / p2); // Mole fraction of water vapor in outlet air
  const y2_dry_air = (1 - y2_wat_vap); // Mole fraction of dry air (in outlet air)

  // Volumetric flow rate (using dry air balance)
  const m2 = ((y1_dry_air * m1) / y2_dry_air); // Volumetric flow rate of dry air at outlet (kmol/min)

  // Water balance
  let m3 = (m1 * y1_wat_vap) - (m2 * y2_wat_vap); // Volumetric flow rate of condensed water (in kmol/min)
  m3 = m3 > 0 ? m3 : 0;

  // Flow rate of condensed water 
  const water_flow_rate = (m3 * 1000 * 18); // (in g/min)
  const water_condensed_per_hour = (water_flow_rate * 60 / 1000); // (in kg)

  return {
    y1_wat_vap,
    y1_dry_air,
    y2_wat_vap,
    y2_dry_air,
    m1,
    m2,
    m3,
    water_flow_rate,
    water_condensed_per_hour,
    p1,
    v1,
    t1,
    rh,
    t2,
    p2,
  };
};


  // Compute function without API call
  const handleCompute = () => {
    const p1 = Number(inletPressure);
    const v1 = Number(inletVolume);
    const t1 = Number(inletTemp);
    const rh = Number(inletRH);
    const t2 = Number(outletTemp);
    const p2 = Number(outletPressure);
    const p = Number(stpPressure);
    const v = Number(stpVolume);
    const t = Number(stpTemp);

    // Get mock results
    const computedResults = flowCalc(p1, v1, t1, rh, t2, p2, p, v, t);

    setResults({
      waterVapourInlet: computedResults.y1_wat_vap,
      dryAirInlet: computedResults.y1_dry_air,
      waterVapourOutlet: computedResults.y2_wat_vap,
      dryAirOutlet: computedResults.y2_dry_air,
      condensedWater: computedResults.water_condensed_per_hour,
      waterFlowRate: computedResults.water_flow_rate,
	  m1: computedResults.m1,
	  m2: computedResults.m2,
	  m3: computedResults.m3,
    });
  };

  return (
    <div className="HeaterTubeSimulation">
      <h1>Parameters of the Generator</h1>
	  <div class="bcontainer">
    <p>Click on this button to automatically get data from sensors</p>
    <button class="get-data-button">Get Data</button>
	</div>


      {/* Inlet, STP, and Outlet Conditions */}
      <div className="input-container">
        {/* Inlet Conditions */}
        <section>
          <h2>Inlet Conditions</h2>
          <label>
            Pressure (mmHg):
            <input
              type="number"
              value={inletPressure}
              onChange={(e) => setInletPressure(e.target.value)}
            />
          </label>
          <label>
            Volume (m3/min):
            <input
              type="number"
              value={inletVolume}
              onChange={(e) => setInletVolume(e.target.value)}
            />
          </label>
          <label>
            Temperature (Celsius):
            <input
              type="number"
              value={inletTemp}
              onChange={(e) => setInletTemp(e.target.value)}
            />
          </label>
          <label>
            Inlet Relative Humidity:
            <input
              type="number"
              value={inletRH}
              onChange={(e) => setInletRH(e.target.value)}
            />
          </label>
        </section>

        {/* STP Conditions */}
        <section>
          <h2>STP Conditions</h2>
		  <p> Reference Condition for gases inside the Generator</p>
          <label>
            Pressure (mmHg):
            <input
              type="number"
              value={stpPressure}
              onChange={(e) => setStpPressure(e.target.value)}
            />
          </label>
          <label>
            Volume (m3/min):
            <input
              type="number"
              value={stpVolume}
              onChange={(e) => setStpVolume(e.target.value)}
            />
          </label>
          <label>
            Temperature (Celsius):
            <input
              type="number"
              value={stpTemp}
              onChange={(e) => setStpTemp(e.target.value)}
            />
          </label>
        </section>

        {/* Outlet Conditions */}
        <section>
          <h2>Outlet Conditions</h2>
          <label>
            Pressure (mmHg):
            <input
              type="number"
              value={outletPressure}
              onChange={(e) => setOutletPressure(e.target.value)}
            />
          </label>
          <label>
            Temperature (Celsius):
            <input
              type="number"
              value={outletTemp}
              onChange={(e) => setOutletTemp(e.target.value)}
            />
          </label>
        </section>
      </div>

      {/* Button to trigger computation */}
      <button onClick={handleCompute} className="btn">Compute</button>

    {/* Results Section */}
<div className="results-container">
  <h2>Results</h2>
  
  <div className="results-columns">
    <div className="mole-fractions">
      <h3>Mole Fractions</h3>
      <p>Water Vapour at Inlet (y1): {parseFloat(results.waterVapourInlet).toFixed(4)}</p>
      <p>Dry Air at Inlet (1-y1): {parseFloat(results.dryAirInlet).toFixed(4)}</p>
      <p>Water Vapour at Outlet (y2): {parseFloat(results.waterVapourOutlet).toFixed(4)}</p>
      <p>Dry Air at Outlet (1-y2): {parseFloat(results.dryAirOutlet).toFixed(4)}</p>
    </div>
    
    <div className="volumetric-flow-rate">
      <h3>Volumetric Flow Rate</h3>
      <p>Dry Air at Inlet (m1): {parseFloat(results.m1).toFixed(4)} </p>
      <p>Dry Air at Outlet (m2): {parseFloat(results.m2).toFixed(4)}</p>
      <p>Condensed Water (m3): {parseFloat(results.m3).toFixed(4)}</p>
      <p>Water Flow Rate: {parseFloat(results.waterFlowRate).toFixed(4)}</p>
      <p>Mass of Water Condensed per Hour: {parseFloat(results.condensedWater).toFixed(4)}</p>
    </div>
  </div>
</div>

    </div>
  );
}

export default HeaterTubeSimulation;
