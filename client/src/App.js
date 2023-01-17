import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Writing, Landing, Register, MyStories, NewStory } from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/writing"
          element={
            <ProtectedRoute>
              <Writing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myStories"
          element={
            <ProtectedRoute>
              <MyStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newStory"
          element={
            <ProtectedRoute>
              <NewStory />
            </ProtectedRoute>
          }
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
