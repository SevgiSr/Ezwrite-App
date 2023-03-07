import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Writing,
  Landing,
  Register,
  MyStories,
  NewStory,
  MyStoryChapters,
} from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";

import {
  About,
  Conversations,
  Following,
  ProfileLayout,
} from "./pages/dashboard/profile";

import {
  Home,
  SharedLayout,
  Search,
  Story,
  Chapter,
  Inbox,
  Messages,
  Notifications,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*PROFILE */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="user/:username" element={<ProfileLayout />}>
            <Route index element={<About />} />
            <Route path="conversations" element={<Conversations />} />
            <Route path="following" element={<Following />} />
          </Route>
          <Route path="/myStories" element={<MyStories />} />
          <Route path="/stories/:category" element={<Search />} />
          <Route path="/stories/search/:query" element={<Search />} />
          <Route path="/story/:story_id" element={<Story />} />
          <Route path="/:story_id/:chapter_id" element={<Chapter />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:username" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route
          path="/:story_id/:chapter_id/writing"
          element={
            <ProtectedRoute>
              <Writing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:story_id"
          element={
            <ProtectedRoute>
              <MyStoryChapters />
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
