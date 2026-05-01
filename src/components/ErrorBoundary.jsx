import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("Global Error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
          <h1 className="text-2xl font-bold mb-4">
            Something went wrong.
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 rounded"
          >
            Reload App
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary