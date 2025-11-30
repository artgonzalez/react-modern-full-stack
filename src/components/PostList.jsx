import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

// Define the component, providing a default empty array for robustness
export function PostList({ posts = [] }) {
    return (
        <section className="post-list-container">
            {posts.length > 0 ? (
                posts.map((post) => (
                    // Using a div here keeps the Post component and the HR visually grouped
                    <div key={post._id}>
                        {/* Spread all post properties as props to the Post component */}
                        <Post {...post} />
                        <hr />
                    </div>
                ))
            ) : (
                <p>No posts found. Be the first to create one!</p>
            )}
        </section>
    );
}

// Define PropTypes for type checking
PostList.propTypes = {
    // Ensures 'posts' is an array of objects that match the shape required by the Post component
    posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};