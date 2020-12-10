import DLC from "./DLC"
import RF from "./RF"

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedTVDPrior) => {
  const converter = (Math.PI)/180

  const calculatedDLC = DLC(inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent)

  const calculatedRF = RF(measuredDepthPrior, measuredDepthCurrent, calculatedDLC)

  const calculatedTVDCurrent = calculatedTVDPrior + calculatedRF * (Math.cos(inclinationPrior*converter) + Math.cos(inclinationCurrent*converter));

  return (
    parseFloat(calculatedTVDCurrent.toFixed(2))
  )
}