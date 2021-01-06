export default (measuredDepthPrior, measuredDepthCurrent, calculatedDLC) => {
  return (
    Math.tan(calculatedDLC/2)
    *
    ((measuredDepthCurrent - measuredDepthPrior) / calculatedDLC)
  )
}