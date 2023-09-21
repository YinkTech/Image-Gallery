import React from "react";
import ImageBox from "../lib/ImageBox";

const Control = () => {

  return (
    <div className="App">
      <h1 className="text-center text-4xl text-[#000] font-bold">
        Art Gallery
      </h1>
      <div className="list-contanier container mx-auto">
        <div className="list-item list-none">
          <ImageBox />
        </div>
      </div>
    </div>
  );
};

export default Control;
