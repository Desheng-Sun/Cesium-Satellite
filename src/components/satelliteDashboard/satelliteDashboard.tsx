import { Row } from "antd";
import React, { useEffect, useState } from "react";
import "./css/dashboard.css";
import LineChart from "./dashboardComponents/lineChart";
import TextCard from "./dashboardComponents/textCard";

const SatelliteDashboard: React.FC<{}> = () => {
  const [init, setInit] = useState<boolean>(false);
  const [groundBusinessState, setGroundBusiniessState] = useState<any>(null);
  const [groundReliabilityState, setGroundReliabilityState] =
    useState<any>(null);
  const [groundStabilityState, setGroundStabilityState] = useState<any>(null);
  const [satelliteCoverageState, setSatelliteCoverage] = useState<any>(null);
  const [satelliteStabilityState, setSatelliteStability] = useState<any>(null);
  const [satelliteUseRateState, setSatelliteUseRate] = useState<any>(null);
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      fetch("./data/groundData/groundBusiness.json")
        .then((res) => res.json())
        .then((data) => {
          setGroundBusiniessState(data);
        });
      fetch("./data/groundData/groundReliability.json")
        .then((res) => res.json())
        .then((data) => {
          setGroundReliabilityState(data);
        });
      fetch("./data/groundData/groundStability.json")
        .then((res) => res.json())
        .then((data) => {
          setGroundStabilityState(data);
        });
      fetch("./data/satelliteData/satelliteCoverage.json")
        .then((res) => res.json())
        .then((data) => {
          setSatelliteCoverage(data);
        });
      fetch("./data/satelliteData/satelliteStability.json")
        .then((res) => res.json())
        .then((data) => {
          setSatelliteStability(data);
        });
      fetch("./data/satelliteData/satelliteUseRate.json")
        .then((res) => res.json())
        .then((data) => {
          setSatelliteUseRate(data);
        });
    }
  }, [init]);

  function aaa() {}

  return (
    <div
      className="dashboard-container"
      style={{ width: "100%", height: "100%" }}
    >
      <header className="dashboard-title">
        <p>卫星态势分析</p>
        <button
          className="dashboard-button"
          onClick={() => {
            //@ts-ignore
            window.location = "http://localhost:3000";
          }}
        >
          返回监测平台
        </button>
      </header>
      <div className="charts-container">
        <div className="ground-info">
          <p>地面节点运行效能</p>
          <div className="chart-list">
            <TextCard
              title={"平均在网时长"}
              width={300}
              height={"100%"}
              content={"19.24 小时"}
            />
            <TextCard
              title={"平均入网次数"}
              width={300}
              height={"100%"}
              content={"2.54 次"}
            />
            <TextCard
              title={"平均退网次数"}
              width={300}
              height={"100%"}
              content={"1.82 次"}
            />
            {groundBusinessState === null ? (
              <></>
            ) : (
              <LineChart
                title={"groundBusiness"}
                type={"Bar"}
                width={550}
                height={"100%"}
                xData={groundBusinessState["DateTime"]}
                yData={[
                  groundBusinessState["Time percent"],
                  groundBusinessState["SendTeraBytes"],
                  groundBusinessState["RecTeraBytes"],
                ]}
                legend={["Time percent", "SendTeraBytes", "RecTeraBytes"]}
              />
            )}
            {groundReliabilityState === null ? (
              <></>
            ) : (
              <LineChart
                title={"groundReliability"}
                type={"Bar"}
                width={550}
                height={"100%"}
                xData={groundReliabilityState["DateTime"]}
                yData={[
                  groundReliabilityState["normal"],
                  groundReliabilityState["major fault"],
                  groundReliabilityState["minor fault"],
                ]}
                legend={["normal", "major fault", "minor fault"]}
              />
            )}
            {groundStabilityState === null ? (
              <></>
            ) : (
              <LineChart
                title={"groundStability"}
                type={"Line"}
                width={550}
                height={"100%"}
                xData={groundStabilityState["DateTime"]}
                yData={groundStabilityState["AvgTime"]}
                legend={["AvgTime"]}
              />
            )}
          </div>
        </div>

        <div className="satellite-info">
          <p>卫星节点运行效能</p>
          <div className="chart-list">
            <TextCard
              title={"卫星覆盖率"}
              width={300}
              height={"100%"}
              content={"————"}
            />
            <TextCard
              title={"卫星平均工作时间"}
              width={300}
              height={"100%"}
              content={"22.31"}
            />
            <TextCard
              title={"卫星频率利用率"}
              width={300}
              height={"100%"}
              content={"————"}
            />
            {satelliteCoverageState === null ? (
              <></>
            ) : (
              <LineChart
                title={"satelliteCoverage"}
                type={"Bar"}
                width={550}
                height={"100%"}
                xData={satelliteCoverageState["DateTime"]}
                yData={[
                  satelliteCoverageState["GlobalBeamCoverage"],
                  satelliteCoverageState["RegionalBeamCoverage"],
                  satelliteCoverageState["SpotBeamCoverage"],
                  satelliteCoverageState["RegionalBeamMobility"],
                  satelliteCoverageState["SpotBeamMobility"],
                ]}
                legend={[
                  "GlobalBeamCoverage",
                  "RegionalBeamCoverage",
                  "SpotBeamCoverage",
                  "RegionalBeamMobility",
                  "SpotBeamMobility",
                ]}
              />
            )}
            {satelliteStabilityState === null ? (
              <></>
            ) : (
              <LineChart
                title={"groundRelsatelliteStabilityStateiability"}
                type={"Bar"}
                width={550}
                height={"100%"}
                xData={satelliteStabilityState["DateTime"]}
                yData={[
                  satelliteStabilityState["normal"],
                  satelliteStabilityState["major fault"],
                  satelliteStabilityState["minor fault"],
                ]}
                legend={["normal", "major fault", "minor fault"]}
              />
            )}
            {satelliteUseRateState === null ? (
              <></>
            ) : (
              <LineChart
                title={"satelliteUseRateState"}
                type={"Bar"}
                width={550}
                height={"100%"}
                xData={satelliteUseRateState["DateTime"]}
                yData={[
                  satelliteUseRateState["WorkTimePercent"],
                  satelliteUseRateState["SatelliteFrequencyUtilization"],
                  satelliteUseRateState["TransponderFrequencyUtilization"],
                  satelliteUseRateState["BeamFrequencyUtilization"],
                  satelliteUseRateState["BandFrequencyUtilization"],
                  satelliteUseRateState["SatellitePowerUtilization"],
                  satelliteUseRateState["AmplifierPowerUtilization"],
                ]}
                legend={[
                  "WorkTimePercent",
                  "SatelliteFrequencyUtilization",
                  "TransponderFrequencyUtilization",
                  "BeamFrequencyUtilization",
                  "BandFrequencyUtilization",
                  "SatellitePowerUtilization",
                  "AmplifierPowerUtilization",
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteDashboard;
