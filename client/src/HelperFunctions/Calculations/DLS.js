import DLC from "./DLC"

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior = 1, inclinationPrior = 2, azimuthPrior = 3 ) => {
  const converter = (Math.PI)/180;

  // calculate DLC
  const calculatedDLC = DLC(inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent)

  const calculatedDLS = ((calculatedDLC/converter)*100/(measuredDepthCurrent-measuredDepthPrior))

  return (
    parseFloat(calculatedDLS.toFixed(2))
  )

}