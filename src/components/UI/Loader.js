import React from "react";
import { SunspotLoader } from "react-awesome-loaders";
export default function Loader() {
  return (
    <div className="center">
      <SunspotLoader
        gradientColors={["#fff", "#E0E7FF"]}
        shadowColor={"#000"}
        desktopSize={"100px"}
        mobileSize={"72px"}
      />
    </div>
  );
}
