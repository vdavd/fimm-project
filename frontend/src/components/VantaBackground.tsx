import { useState, useEffect, useRef } from "react";
// @ts-ignore
import CELLS from "vanta/dist/vanta.cells.min";
import * as THREE from "three";

export const vantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CELLS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: 0xc5,
          color2: 0xb2e3ff,
          speed: 0.75,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed", // stays in place on scroll
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // push behind all content
      }}
    />
  );
};

export default vantaBackground;
