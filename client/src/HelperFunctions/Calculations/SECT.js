import EW from './EW';
import NS from './NS';

export default (measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior = 1, inclinationPrior = 2, azimuthPrior = 3, calculatedNorthingPrior = 0.02, calculatedEastingPrior = 0, index, vsDirection = 0) => {
  const converter = (Math.PI)/180;
  const converter2 = 0.00000001;

  const calculatedEastingCurrent = EW(measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedEastingPrior)

  const calculatedNorthingCurrent = NS(measuredDepthCurrent, inclinationCurrent, azimuthCurrent, measuredDepthPrior, inclinationPrior, azimuthPrior, calculatedNorthingPrior)

  const closure = Math.atan2(calculatedEastingCurrent, calculatedNorthingCurrent + converter2) / converter

  const determineClosure = () => {
    if (closure < 0) {
      return Math.cos(((360 + closure) - vsDirection) * converter)
    } else {
      return Math.cos((closure - vsDirection) * converter)
    }
  }

  const HD = Math.sqrt(Math.pow(calculatedNorthingCurrent, 2) + Math.pow(calculatedEastingCurrent, 2))

  const calculatedSect = HD * determineClosure()


  return (
    parseFloat(calculatedSect.toFixed(2))
  )
};
