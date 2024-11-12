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

  // No API call - simplified flowCalc function with mock values
  const flowCalc = (p1, v1, t1, rh, t2, p2, p, v, t) => {
    // Mock values
    const waterVapourInlet = (rh * 0.03).toFixed(3);
    const dryAirInlet = (1 - waterVapourInlet).toFixed(3);
    const waterVapourOutlet = (0.02).toFixed(3);
    const dryAirOutlet = (1 - waterVapourOutlet).toFixed(3);
    const condensedWater = (0.005).toFixed(3);
    const waterFlowRate = (5).toFixed(3);

    return {
      waterVapourInlet,
      dryAirInlet,
      waterVapourOutlet,
      dryAirOutlet,
      condensedWater,
      waterFlowRate,
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
      waterVapourInlet: computedResults.waterVapourInlet,
      dryAirInlet: computedResults.dryAirInlet,
      waterVapourOutlet: computedResults.waterVapourOutlet,
      dryAirOutlet: computedResults.dryAirOutlet,
      condensedWater: computedResults.condensedWater,
      waterFlowRate: computedResults.waterFlowRate,
    });
  };

  return (
    <div className="HeaterTubeSimulation">
      <h1>Heater Tube Simulations</h1>

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
      <button onClick={handleCompute}>Compute</button>

      {/* Results Section */}
      <div className="results-container">
        <h2>Results</h2>
        <p>Water Vapour Inlet: {results.waterVapourInlet}</p>
        <p>Dry Air Inlet: {results.dryAirInlet}</p>
        <p>Water Vapour Outlet: {results.waterVapourOutlet}</p>
        <p>Dry Air Outlet: {results.dryAirOutlet}</p>
        <p>Condensed Water: {results.condensedWater}</p>
        <p>Water Flow Rate: {results.waterFlowRate}</p>
      </div>
    </div>
  );
}

export default HeaterTubeSimulation;
