import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import {
  Writing,
  Landing,
  Register,
  NewStory,
  EditStoryDetails,
  ProtectedRoute,
} from "./pages";

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
  Library,
  ReadingList,
  Browse,
  WorkspaceLayout,
  MyForks,
  ForkedStories,
  Pending,
  MyStories,
  Stories,
  ManageStory,
  ManageChapters,
  ManagePulls,
  ManageHistory,
  ManageCollabs,
  MobileSideNavbar,
  Collaborations,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
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
          <Route path="/more-nav" element={<MobileSideNavbar />} />
          <Route path="/user/:username" element={<ProfileLayout />}>
            <Route index element={<About />} />
            <Route path="conversations" element={<Conversations />} />
            <Route path="following" element={<Following />} />
            <Route path="activity" element={<Activity />} />
          </Route>
          <Route path="/workspace" element={<WorkspaceLayout />}>
            <Route path="myStories" element={<MyStories />}>
              <Route index element={<Stories />} />
            </Route>
            <Route path="myForks" element={<MyForks />}>
              <Route index element={<ForkedStories />} />
              <Route path="pending" element={<Pending />} />
            </Route>
          </Route>
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/library" element={<Library />} />
          <Route path="/list/:list_id" element={<ReadingList />} />
          <Route path="/stories/:category" element={<Search />} />
          <Route path="/stories/search/:query" element={<Search />} />
          <Route path="/stories/search/tags/:tag" element={<Search />} />
          <Route path="/story/:story_id" element={<Story />} />
          <Route path="/:story_id/:chapter_id" element={<Chapter />} />
          <Route path="/fork/:fork_id/:chapter_id" element={<Chapter />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:username" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/manage/:story_id" element={<ManageStory />}>
            <Route index element={<ManageChapters />} />
            <Route path="pull-requests" element={<ManagePulls />} />
            <Route path="collab-requests" element={<ManageCollabs />} />
            <Route path="merge-history" element={<ManageHistory />} />
          </Route>
        </Route>

        <Route
          path="/myworks/:story_id/:chapter_id/writing"
          element={
            <ProtectedRoute>
              <Writing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myforks/:fork_id/:chapter_id/writing"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
