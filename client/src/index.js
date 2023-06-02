import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/userContext";
import { ProfileProvider } from "./context/profileContext";
import { MyStoryProvider } from "./context/myStoryContext";
import { StoryProvider } from "./context/storyContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <UserProvider>
        <StoryProvider>
          <MyStoryProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </MyStoryProvider>
        </StoryProvider>
      </UserProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
