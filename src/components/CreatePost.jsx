import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
    const [token] = useAuth();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const queryClient = useQueryClient();

    // Define the mutation hook
    const createPostMutation = useMutation({
        // mutationFn now accepts a variable (newPostData)
        mutationFn: (newPostData) => createPost(token, newPostData),
        onSuccess: () => {
            // Invalidate queries to refetch the post list
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            // Clear the form fields after successful submission
            setTitle('');
            setContents('');
        },
        // Optional: Add onError for better user feedback
        onError: (error) => {
            console.error("Failed to create post:", error);
        },
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the current state values as an object to the mutate function
        createPostMutation.mutate({ title, contents });
    };

    // Use isPending, isError, and error from the mutation state
    const { isPending, isError, error } = createPostMutation;

    if (!token) {
        return <div>Please log in to create new posts.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='create-title'>Title: </label>
                <input
                    type='text'
                    name='create-title'
                    id='create-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <textarea value={contents} onChange={(e) => setContents(e.target.value)} />
            <br />
            <br />
            {/* Use a button element for clearer semantics */}
            <button
                type='submit'
                disabled={!title || isPending}
            >
                {isPending ? 'Creating...' : 'Create'}
            </button>

            {/* Display error message if mutation fails */}
            {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </form>
    );
}