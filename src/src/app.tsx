import { useEffect } from 'preact/hooks'
import './app.css'
import { initThreejsApp, regenerateSword } from './threejs-app';

export function App() {

  useEffect(() => {
    initThreejsApp('generator-canvas');
  }, []);

  const getSword = () => {
    regenerateSword();
  }

  return (
    <>
      <div id='title-container'>
        <h1>Sword Generator</h1>
        <button onClick={getSword}>Get new</button>
      </div>

      <canvas id='generator-canvas'></canvas>
    </>
  )
}
