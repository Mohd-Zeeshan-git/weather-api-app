export const loggerMiddleware = store => next => action => {
  if (process.env.NODE_ENV === "development") {
    console.groupCollapsed(`Action: ${action.type}`)
    console.log("Payload:", action.payload)
    console.log("Prev State:", store.getState())
  }

  const result = next(action)

  if (process.env.NODE_ENV === "development") {
    console.log("Next State:", store.getState())
    console.groupEnd()
  }

  return result
}