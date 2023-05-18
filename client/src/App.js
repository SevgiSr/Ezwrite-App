import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  Activity,
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
  Settings,
} from "./pages/dashboard";
import EditStoryDetails from "./pages/EditStoryDetails";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path="activity" element={<Activity />} />
            </Route>
            <Route path="/myStories" element={<MyStories />} />
            <Route path="/stories/:category" element={<Search />} />
            <Route path="/stories/search/:query" element={<Search />} />
            <Route path="/story/:story_id" element={<Story />} />
            <Route path="/:story_id/:chapter_id" element={<Chapter />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inbox/:username" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
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
                <EditStoryDetails />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
