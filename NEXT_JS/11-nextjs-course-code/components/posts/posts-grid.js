import PostItem from "./posts-item";
import classes from "./posts-grid.module.css";

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.plug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
