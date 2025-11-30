import { requireAuth } from '../security/jwt.js'

import {
    listAllPosts,
    listPostsByAuthor,
    listPostsByTag,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '../services/posts.js'

const handleListPosts = async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query;
    const options = { sortBy, sortOrder };

    try {
        if (author && tag) {
            return res
                .status(400)
                .json({ error: 'query by either author or tag, not both' });
        } else if (author) {
            const posts = await listPostsByAuthor(author, options);
            return res.json(posts);
        } else if (tag) {
            const posts = await listPostsByTag(tag, options);
            return res.json(posts);
        } else {
            const posts = await listAllPosts(options);
            return res.json(posts);
        }
    } catch (err) {
        console.error('Error listing posts:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleGetPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await getPostById(id);
        if (!post) {
            // Return 404 if the specific resource is not found
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.json(post);
    } catch (err) {
        console.error(`Error getting post ${id}:`, err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleCreatePost = async (req, res) => {
    try {
        // Assuming req.auth.sub contains the user ID from the requireAuth middleware
        const post = await createPost(req.auth.sub, req.body);
        // Use 201 Created status for successful resource creation
        return res.status(201).json(post); 
    } catch (err) {
        console.error('Error creating post:', err.message);

        // Can add more specific checks here if createPost service throws specific errors (e.g., validation errors -> 400)
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleUpdatePost = async (req, res) => {
    try {
        const post = await updatePost(req.auth.sub, req.params.id, req.body);

        if (!post) {
            // If the update service returns null because the post wasn't found or user wasn't authorized
            return res.status(404).json({ error: 'Post not found or unauthorized' });
        }
        return res.json(post);
    } catch (err) {
        console.error(`Error updating post ${req.params.id}:`, err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const handleDeletePost = async (req, res) => {
    try {
        // Service should handle auth check internally and return success status/count
        const { deletedCount } = await deletePost(req.auth.sub, req.params.id);
        
        if (deletedCount === 0) {
            // The post didn't exist or the user wasn't the author/unauthorized
            return res.status(404).json({ error: 'Post not found or unauthorized' });
        }
        // Use 204 No Content for successful deletions where no body is returned
        return res.status(204).end(); 
    } catch (err) {
        console.error(`Error deleting post ${req.params.id}:`, err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export function postsRoutes(app) {
    app.get('/api/v1/posts', handleListPosts);
    app.get('/api/v1/posts/:id', handleGetPostById);
    
    // Auth-required routes use the requireAuth middleware before the controller
    app.post('/api/v1/posts', requireAuth, handleCreatePost);
    app.patch('/api/v1/posts/:id', requireAuth, handleUpdatePost);
    app.delete('/api/v1/posts/:id', requireAuth, handleDeletePost);
}        