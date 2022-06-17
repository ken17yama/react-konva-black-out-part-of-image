import "./styles.css";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const LionImage = () => {
  const [image] = useImage("https://konvajs.org/assets/lion.png");
  return <Image image={image} />;
};

export default function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <LionImage />
      </Layer>
    </Stage>
  );
}
