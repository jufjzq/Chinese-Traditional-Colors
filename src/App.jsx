import './App.css'
import Zdog from 'zdog'
import Zfont from 'zfont'
import { useRef, useEffect, useState } from 'react'
import colors from './assets/colors.json'
import KwHVBOEy3iSp from './assets/fonts/KwHVBOEy3iSp.ttf'

Zfont.init(Zdog);

function App() {
  const zdogCanvas = useRef(null);
  const [colorName, setColorName] = useState('');
  const [bgColor, setBgColor] = useState('');
  const count = 26

  useEffect(() => {
    const { offsetWidth, offsetHeight } = zdogCanvas.current;
    zdogCanvas.current.setAttribute('width', offsetWidth)
    zdogCanvas.current.setAttribute('height', offsetHeight)

    let illo = new Zdog.Illustration({
      element: zdogCanvas.current,
      dragRotate: true,
      translate: { x: 10, y: -100 },
      rotate: { x: Zdog.TAU / 6, z: Zdog.TAU / 8 },
      fill: '#eee7d8',
      zoom: 3
    });

    var font = new Zdog.Font({ src: KwHVBOEy3iSp, });

    new Zdog.Text({
      addTo: illo,
      font,
      value: '中国传统颜色可视化',
      fontSize: 24,
      color: '#e19a27',
      textAlign: 'center',
      textBaseline: 'middle',
      fill: true,
      translate: { x: -80, y: 100 },
      rotate: { x: -Zdog.TAU / 4, y: -Zdog.TAU / 4 }
    });


    colors.forEach((colorObj, index) => {
      let i = index + 1;
      const rowCount = Math.floor(index / count)
      setTimeout(() => {
        const x = rowCount * 12
        const y = index % count * 12
        new Zdog.Box({
          addTo: illo,
          width: 6,
          height: 6,
          depth: 20,
          stroke: 1,
          color: colorObj.hex,
          translate: { x, y },
        });
        // 改变右上角的颜色信息
        setColorName(colorObj.name);
        setBgColor(colorObj.hex);
      }, 300 * index + 1);
    })

    function animate() {
      illo.updateRenderGraph()
      requestAnimationFrame(animate)
    }
    animate()

  }, []);

  return (
    <>
      <canvas className='zdog-canvas' ref={zdogCanvas} />
      <div className='color-info-wrapper' style={{ backgroundColor: bgColor }}>{colorName}</div >
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
