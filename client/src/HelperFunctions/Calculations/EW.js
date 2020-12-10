import DLC from "./DLC"
import RF from "./RF"

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedEastingPrior) => {
  const converter = (Math.PI)/180

  const calculatedDLC = DLC(inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent)

  const calculatedRF = RF(measuredDepthPrior, measuredDepthCurrent, calculatedDLC)

  const calculatedEastingCurrent = (calculatedEastingPrior + calculatedRF *(Math.sin(inclinationPrior*converter)))

  return (
    parseFloat(calculatedEastingCurrent.toFixed(2))
  )

}