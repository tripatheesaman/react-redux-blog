import { useDispatch } from "react-redux";
import { increaseReaction } from "./postsSlice";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
};
const Reactions = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        type="button"
        key={Math.random()}
        className="reactionButton"
        onClick={() =>
          dispatch(increaseReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default Reactions;
