import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Post({ title, contents, author }) {
    return (
        <article>
        <h3>{title}</h3>
        <div>{contents}</div>
        {author && (
        <em>
        <br />
        Written by <strong><User id={author} /></strong>
        </em>
        )}
        </article>
    )
};

Post.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.string,
    author: PropTypes.string,
};