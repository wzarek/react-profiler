import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import { ErrorBoundary, GlobalPropsMonitor } from "react-profiling-tool";
import ErrrorFallback from "./components/shared/ErrrorFallback";

const App: React.FC = () => (
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
          <ErrorBoundary
            fallback={<ErrrorFallback />}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <GlobalPropsMonitor>
                    <TodoList />
                  </GlobalPropsMonitor>
                }
              />
              <Route
                path="/add"
                element={
                  <GlobalPropsMonitor>
                    <AddTodo />
                  </GlobalPropsMonitor>
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  </Router>
);

export default App;
