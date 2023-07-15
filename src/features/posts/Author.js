import { selectAllUsers } from "../users/usersSlice";
import { useSelector } from "react-redux";
const Author = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const postAuthor = users.find((user) => user.id === userId);
  return <span>by {postAuthor ? postAuthor.name : "Unknown Author"}</span>;
};

export default Author;
