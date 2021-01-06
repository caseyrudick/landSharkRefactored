import DLC from "./DLC"
import RF from "./RF"

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedEastingPrior) => {
  const converter = (Math.PI)/180;

  const calculatedDLC = DLC(inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent)
  console.log(`EW calculatedDLC ${calculatedDLC}`)

  const calculatedRF = RF(measuredDepthPrior, measuredDepthCurrent, calculatedDLC)
  console.log(`EW calculatedRF ${calculatedRF}`)

  const calculatedEastingCurrent = (calculatedEastingPrior + calculatedRF *(Math.sin(inclinationPrior*converter)* Math.sin(azimuthPrior * converter) + Math.sin(inclinationCurrent * converter)*Math.sin(azimuthCurrent*converter)));
  console.log(`Easting: ${calculatedEastingCurrent}`)
  return (
    parseFloat(calculatedEastingCurrent.toFixed(2))
    // calculatedEastingCurrent
  )
};
