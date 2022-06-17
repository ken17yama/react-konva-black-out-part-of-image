import { useEffect } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

export default function DisplayImage({ inputURL, setImageSize }) {
  const [image] = useImage(inputURL);

  useEffect(() => {
    if (image) {
      setImageSize({ width: image.width, height: image.height });
    }
  });

  return <Image image={image} />;
}
