import { createRef } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { runThreejsApp } from './threejs-app';

export function App() {


  useEffect(() => {
    runThreejsApp('generator-canvas');
  }, []);

  return (
    <>
      <h1 id='generator-title'>Sword Generator!</h1>
      <canvas id='generator-canvas'></canvas>
    </>
  )
}
