import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectAllPosts,
  getPostError,
  getPostStatus,
  fetchPosts,
} from "./postsSlice";
import IndividualPost from "./IndividualPost";
const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = sortedPosts.map((post) => (
      <IndividualPost key={Math.random() * 1001 + 2000} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{postError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
