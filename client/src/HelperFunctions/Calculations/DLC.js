export default (inclinationPrior, inclinationCurrent, azimuthPrior, azimuthCurrent) => {
  const converter = Math.PI/180;
  const converter2 = 0.00000001;

  return (
    Math.acos(
      (
        Math.cos(inclinationPrior*converter)*Math.cos(inclinationCurrent*converter)
      )
      +
      (
        Math.sin(inclinationPrior*converter)*Math.sin(inclinationCurrent*converter)*Math.cos((azimuthCurrent-azimuthPrior)*converter-converter2)
      )
    )
  )
}