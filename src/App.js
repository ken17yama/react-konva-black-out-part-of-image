import "./styles.css";
import { useState } from "react";
import { Stage, Layer } from "react-konva";

import DisplayImage from "./features/DisplayImage";

export default function App() {
  const [inputURL, setInputURL] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const InputImageHandler = (e) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(e.target.files[0]);
    setInputURL(url);
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={InputImageHandler} />
      <Stage width={imageSize.width} height={imageSize.height}>
        <Layer>
          <DisplayImage inputURL={inputURL} setImageSize={setImageSize} />
        </Layer>
      </Stage>
    </>
  );
}
