import DLC from "./DLC"
import RF from "./RF"

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedNorthingPrior) => {
  const converter = (Math.PI)/180;
  const converter2 = 0.00000001;

  const calculatedDLC = DLC(inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent)
  console.log(`NS calculatedDLC ${calculatedDLC}`)

  const calculatedRF = RF(measuredDepthPrior, measuredDepthCurrent, calculatedDLC)
  console.log(`NS calculatedRF ${calculatedRF}`)

  const calculatedNorthingCurrent = (calculatedNorthingPrior+converter2) + calculatedRF * (Math.sin(inclinationPrior*converter)*Math.cos(azimuthPrior*converter)+ Math.sin(inclinationCurrent * converter) * Math.cos(azimuthCurrent*converter));

  return (
    parseFloat(calculatedNorthingCurrent.toFixed(2))

  )
} 