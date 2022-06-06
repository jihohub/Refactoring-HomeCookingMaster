import React, { useEffect, useState } from "react";
import Image from "next/image";
import loading from "../../../public/assets/loading2.gif";

const LoadingScreen = () => {

  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "#ffffff" }}
    >
      <Image src={loading} style={{ margin: "0 auto" }} />
    </div>
  );
};


export default LoadingScreen;
