import { useState } from 'react'

export default function App() {
  const [dbh, setDbh] = useState(3)
  const [height, setHeight] = useState(9)

  const [hLength, setHLength] = useState(3.5)
  const [hWidth, setHWidth] = useState(3)
  const [hThick, setHThick] = useState(1)
  const [hCount, setHCount] = useState(7)

  const [vLength, setVLength] = useState(4)
  const [vWidth, setVWidth] = useState(4)
  const [vThick, setVThick] = useState(1.5)
  const [vCount, setVCount] = useState(3)

  const [result, setResult] = useState(null)

  function calculate() {
    const logVol = Math.PI * Math.pow(dbh / 2, 2) * height
    const hVol = hLength * (hWidth / 12) * (hThick / 12)
    const vVol = vLength * (vWidth / 12) * (vThick / 12)

    const totalH = logVol / hVol
    const totalV = logVol / vVol

    const palletsH = Math.floor(totalH / hCount)
    const palletsV = Math.floor(totalV / vCount)
    const pallets = Math.min(palletsH, palletsV)

    setResult({
      logVol: logVol.toFixed(2),
      hVol: hVol.toFixed(4),
      vVol: vVol.toFixed(4),
      totalH: Math.floor(totalH),
      totalV: Math.floor(totalV),
      pallets,
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Tree to Pallet Calculator</h1>

      <div>
        <h3>Log Dimensions</h3>
        <input type='number' value={dbh} onChange={e => setDbh(+e.target.value)} placeholder='DBH (ft)' />
        <input type='number' value={height} onChange={e => setHeight(+e.target.value)} placeholder='Height (ft)' />
      </div>

      <div>
        <h3>Horizontal Strips</h3>
        <input type='number' value={hLength} onChange={e => setHLength(+e.target.value)} placeholder='Length (ft)' />
        <input type='number' value={hWidth} onChange={e => setHWidth(+e.target.value)} placeholder='Width (in)' />
        <input type='number' value={hThick} onChange={e => setHThick(+e.target.value)} placeholder='Thickness (in)' />
        <input type='number' value={hCount} onChange={e => setHCount(+e.target.value)} placeholder='Strips per pallet' />
      </div>

      <div>
        <h3>Vertical Strips</h3>
        <input type='number' value={vLength} onChange={e => setVLength(+e.target.value)} placeholder='Length (ft)' />
        <input type='number' value={vWidth} onChange={e => setVWidth(+e.target.value)} placeholder='Width (in)' />
        <input type='number' value={vThick} onChange={e => setVThick(+e.target.value)} placeholder='Thickness (in)' />
        <input type='number' value={vCount} onChange={e => setVCount(+e.target.value)} placeholder='Strips per pallet' />
      </div>

      <button onClick={calculate}>Calculate</button>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Log Volume:</strong> {result.logVol} ft³</p>
          <p><strong>Horizontal Strip Volume:</strong> {result.hVol} ft³</p>
          <p><strong>Vertical Strip Volume:</strong> {result.vVol} ft³</p>
          <p><strong>Total Horizontal Strips:</strong> {result.totalH}</p>
          <p><strong>Total Vertical Strips:</strong> {result.totalV}</p>
          <p><strong>➡️ Max Pallets:</strong> {result.pallets}</p>
        </div>
      )}
    </div>
  )
}
