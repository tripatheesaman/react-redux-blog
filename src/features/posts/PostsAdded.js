import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
const PostsAdded = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const canSave =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addRequestStatus === "idle";
  const onSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPosts({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="author">Author:</label>
        <select
          id="author"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button onClick={onSubmit} disabled={!canSave ? true : false}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default PostsAdded;
