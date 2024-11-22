import { useState } from 'react'
import ErrorThrower from './components/errors/ErrorThrower'
import { ErrorBoundary, GlobalPropsMonitor } from 'react-profiling-tool';
import ErrrorFallback from './components/shared/ErrrorFallback';
import SlowRender from './components/errors/SlowRender';
import LargeRender from './components/errors/LargeRender';
import InfiniteLoop from './components/errors/InfiniteLoop';

type ErrorComponentType = "InfiniteLoop" | "ErrorThrower" | "LargeRender" | "SlowRender";

function App() {
  const [errorType, setErrorType] = useState<ErrorComponentType | undefined>(undefined)

  return (
    <ErrorBoundary
    fallback={<ErrrorFallback />}
    onError={(error,info) => window.alert(`Error: ${error.message}\nStack: ${info.componentStack}`)}
    >
      <GlobalPropsMonitor>
      <>
        <button onClick={() => setErrorType("ErrorThrower")}>
          Click to show error
        </button>
        <button onClick={() => setErrorType("InfiniteLoop")}>
          Click to do infinite loop
        </button>
        <button onClick={() => setErrorType("LargeRender")}>
          Click to make large render
        </button>
        <button onClick={() => setErrorType("SlowRender")}>
          Click to make slow render
        </button>
        {errorType === "ErrorThrower" && <ErrorThrower />}
        {errorType === "InfiniteLoop" && <InfiniteLoop />}
        {errorType === "LargeRender" && <LargeRender />}
        {errorType === "SlowRender" && <SlowRender />}
      </>
    </GlobalPropsMonitor>
    </ErrorBoundary>
  )
}

export default App
