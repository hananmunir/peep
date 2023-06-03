import React from "react";
import { Center, Html, useProgress } from "@react-three/drei";
import "./Loader.css";
import { useEffect } from "react";

// Using the callback function from three js
// to show loading
export default function Loader() {
  const { progress, item } = useProgress();

  return (
    <Center top>
      <Html>
        <div className='loader-container'>
          <span className='loader-counter'>{progress.toFixed(0)}% </span>
        </div>
      </Html>
    </Center>
  );
}
