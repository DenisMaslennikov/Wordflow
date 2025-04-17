import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList.tsx";
import PostListView from "./ui/PostListView.tsx";
import Post from "./pages/Post.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import EditUserProfile from "./pages/EditUserProfile.tsx";
import BlogLayout from "./ui/BlogLayout.tsx";
import BloggerLayout from "./ui/BloggerLayout.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import BloggerPostList from "./pages/BloggerPostList.tsx";
import BloggerPostEditor from "./pages/BloggerPostEditor.tsx";
import BloggerAdmin from "./pages/BloggerAdmin.tsx";
import BloggerComments from "./pages/BloggerComments.tsx";
import BloggerImages from "./pages/BloggerImages.tsx";
import Registration from "./pages/Registration.tsx";
import Login from "./pages/Login.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<BlogLayout />}>
            <Route element={<PostListView />}>
              <Route index path={"/"} element={<PostList />} />
              <Route path={"blog/:blogSlug"} element={<PostList />} />
            </Route>
            <Route path={"blog/:blogSlug/:postSlug"} element={<Post />} />
            <Route path={"profile"} element={<EditUserProfile />} />
            <Route path={"user/:username"} element={<UserProfile />} />
            <Route path={"register"} element={<Registration />} />
            <Route path={"login"} element={<Login />} />
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
            <Route path={"post/:postSlug"} element={<BloggerPostEditor />} />
            <Route path={"users"} element={<BloggerAdmin />} />
            <Route path={"comments"} element={<BloggerComments />} />
            <Route path={"images"} element={<BloggerImages />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
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
    </QueryClientProvider>
  );
}

export default App;
