import React from "react";
import Spinner from "../components/Spinner";

function loading() {
  return (
    <div className="h-[461px] flex flex-col items-center justify-center">
      <Spinner w={24} h={24} color={"fill-teal-500"} />
    </div>
  );
}

export default loading;
