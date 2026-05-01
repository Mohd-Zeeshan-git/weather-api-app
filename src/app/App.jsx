import ErrorBoundary from "../components/ErrorBoundary"
import Navbar from "../components/Navbar"
import Dashboard from "../features/dashboard/Dashboard"

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <Dashboard />
      </div>
    </ErrorBoundary>
  )
}