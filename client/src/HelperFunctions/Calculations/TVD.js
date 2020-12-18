import DLC from "./DLC"
import RF from "./RF"

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedTVDPrior) => {
  const converter = (Math.PI)/180
  console.log(`converter: ${converter}`)

  const calculatedDLC = DLC(inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent)
  console.log(`calculatedDLC: ${calculatedDLC}`)

  const calculatedRF = RF(measuredDepthPrior, measuredDepthCurrent, calculatedDLC)
  console.log(`calculatedRF: ${calculatedRF}`)

  const calculatedTVDCurrent = calculatedTVDPrior + calculatedRF * (Math.cos(inclinationPrior*converter) + Math.cos(inclinationCurrent*converter));
  console.log(`calculatedTVDCurrent: ${calculatedTVDCurrent}`)

  return (
    parseFloat(calculatedTVDCurrent.toFixed(2))
  )
}