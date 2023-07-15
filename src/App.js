import PostsList from "./features/posts/PostsList";
import PostsAdded from "./features/posts/PostsAdded";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  });
  return (
    <main className="App">
      <PostsAdded />
      <PostsList />
    </main>
  );
}

export default App;
