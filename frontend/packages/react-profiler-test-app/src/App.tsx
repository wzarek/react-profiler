import { FC, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import { ErrorBoundary, Monitor } from "react-profiling-tool";
import ErrrorFallback from "./components/shared/ErrrorFallback";
import { PerformanceTester } from "./components/performance/PerformanceTester";

const AppPerfTest: FC = () => {
  const [propToChange, setPropToChange] = useState(0);
  const [monitoredProp, setMonitoredProp] = useState(0);

  return (
    <div>
      <h1>Performance Testing</h1>
      <h2>Bez Monitoringu</h2>
      <PerformanceTester
        propToChange={propToChange}
        setPropToChange={setPropToChange}
      />

      <h2>Z Monitoringiem</h2>
      <Monitor componentName="PerformanceTester">
        <PerformanceTester
          propToChange={monitoredProp}
          setPropToChange={setMonitoredProp}
        />
      </Monitor>
    </div>
  );
};

const App: FC = () => (
  <Router>
    <div className="p-4 bg-slate-900 min-w-screen min-h-screen text-white">
      <div className="w-1/2 mx-auto">
        <nav className="mb-4 flex space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Todo List
          </Link>
          <Link to="/add" className="text-blue-500 hover:underline">
            Add Todo
          </Link>
        </nav>
        <main>
          <ErrorBoundary fallback={<ErrrorFallback />}>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/add" element={<AddTodo />} />
              <Route path="/perf-test" element={<AppPerfTest />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  </Router>
);

export default App;
