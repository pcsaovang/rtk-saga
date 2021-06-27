import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import Countdown from 'features/countdown/countdown';
import { fetchPosts, fetchPost, selectPosts } from './postSlice';

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleFetchPost = () => {
    dispatch(fetchPost({ id: 1 }));
  };

  if (status === 'loading') {
    return <h2>Loading post...</h2>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <Countdown />
      {data?.map((post) => (
        <div key={post.id}>
          <h4 onClick={handleFetchPost} style={{ cursor: 'pointer' }}>
            {post.title}
          </h4>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
