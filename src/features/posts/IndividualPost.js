import TimeDisplay from "./TimeDisplay";
import Author from "./Author";
import Reactions from "./Reactions";

const IndividualPost = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Author userId={post.userId}></Author>
        <TimeDisplay date={post.date} />
      </p>
      <Reactions post={post}></Reactions>
    </article>
  );
};

export default IndividualPost;
