import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ArticleList from "./pages/ArticleList.tsx";
import PostListView from "./ui/PostListView.tsx";
import Post from "./pages/Post.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import BlogLayout from "./ui/BlogLayout.tsx";
import BloggerLayout from "./ui/BloggerLayout.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import BloggerPostList from "./pages/BloggerPostList.tsx";
import BloggerPostEditor from "./pages/BloggerPostEditor.tsx";
import BloggerAdmin from "./pages/BloggerAdmin.tsx";
import BloggerComments from "./pages/BloggerComments.tsx";
import BloggerImages from "./pages/BloggerImages.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import AppWrapper from "./ui/AppWrapper.tsx";
import DarkModeContextProvider from "./context/DarkMode/DarkModeContextProvider.tsx";
import AuthContextProvider from "./context/Auth/AuthContextProvider.tsx";
import {
  DEFAULT_STALE_TIME,
  ERROR_TOAST_DURATION,
  SUCCESS_TOAST_DURATION,
} from "./utils/constants.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});

function App() {
  return (
    <DarkModeContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ReactQueryDevtools />
          <GlobalStyles />
          <AppWrapper>
            <BrowserRouter>
              <Routes>
                <Route element={<BlogLayout />}>
                  <Route element={<PostListView />}>
                    <Route index path={"/"} element={<ArticleList />} />
                    <Route path={"blog/:blogSlug"} element={<ArticleList />} />
                  </Route>
                  <Route
                    path={"blog/:blogSlug/:postSlug/:postId"}
                    element={<Post />}
                  />
                  <Route path={"user/:username"} element={<UserProfile />} />
                </Route>
                <Route
                  path={"admin/:blogSlug"}
                  element={
                    <ProtectedRoute>
                      <BloggerLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route element={<PostListView />}>
                    <Route index element={<Navigate replace to={"posts"} />} />
                    <Route path={"posts"} element={<BloggerPostList />} />
                  </Route>
                  <Route
                    path={"post/:postSlug/:postId"}
                    element={<BloggerPostEditor />}
                  />
                  <Route path={"users"} element={<BloggerAdmin />} />
                  <Route path={"comments"} element={<BloggerComments />} />
                  <Route path={"images"} element={<BloggerImages />} />
                </Route>
                <Route path={"*"} element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </AppWrapper>

          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: SUCCESS_TOAST_DURATION,
              },
              error: {
                duration: ERROR_TOAST_DURATION,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </AuthContextProvider>
      </QueryClientProvider>
    </DarkModeContextProvider>
  );
}

export default App;
