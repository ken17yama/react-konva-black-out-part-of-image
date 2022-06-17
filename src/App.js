import "./styles.css";
import { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";

import DisplayImage from "./features/DisplayImage";
import Rectangle from "./features/Rectangle";

let history = [
  [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: "black",
      id: "rect1"
    },
    {
      x: 100,
      y: 100,
      width: 100,
      height: 50,
      fill: "black",
      id: "rect2"
    }
  ]
];

const downloadURI = (uri, name) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function App() {
  const [inputURL, setInputURL] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [rectangles, setRectangles] = useState(history[0]);
  const [selectedId, setSelectedId] = useState(null);
  const [historyStep, setHistoryStep] = useState(0);

  const stageRef = useRef(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleInputImage = (e) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(e.target.files[0]);
    setInputURL(url);
  };

  const hangleDragEnd = (rect) => {
    history = history.slice(0, historyStep + 1);
    history = history.concat([rect]);
    setHistoryStep(historyStep + 1);
  };

  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    const previous = historyStep - 1;
    setHistoryStep(previous);
    setRectangles(history[previous]);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    const next = historyStep + 1;
    setHistoryStep(next);
    setRectangles(history[next]);
  };

  const handleDownloadImage = () => {
    if (stageRef.current.width() && stageRef.current.height()) {
      setSelectedId(null);
      setTimeout(() => {
        const uri = stageRef.current.toDataURL();
        downloadURI(uri, "fixedImage.png");
      }, 1000);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleInputImage} />
      <div>
        <button onClick={handleUndo}>UnDo</button>
        <button onClick={handleRedo}>ReDo</button>
      </div>
      <button onClick={handleDownloadImage}>Download</button>
      <Stage
        width={imageSize.width}
        height={imageSize.height}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <DisplayImage inputURL={inputURL} setImageSize={setImageSize} />
          {rectangles.map((rectangle, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rectangle}
                isSelected={rectangle.id === selectedId}
                onSelect={() => {
                  setSelectedId(rectangle.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                  hangleDragEnd(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
}
