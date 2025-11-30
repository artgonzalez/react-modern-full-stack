import PropTypes from 'prop-types'
import { User } from './User.jsx'

// Destructure props explicitly in the function signature
export function Post({ title, contents, author }) {
    return (
        // Using <article> is good practice for self-contained content
        <article>
            <h3>{title}</h3>
            <div>{contents}</div>
            
            {/* Conditionally render the footer if an author ID is provided */}
            {author && (
                // Use a footer for post metadata like author info
                <footer>
                    Written by <strong><User id={author} /></strong>
                </footer>
            )}
        </article>
    );
}

// Define PropTypes for type checking
Post.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.string, // Contents is optional
    author: PropTypes.string,   // Author ID is optional (e.g., for anonymous posts)
};