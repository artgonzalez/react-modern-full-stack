import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostList } from '../components/PostList.jsx';
import { CreatePost } from '../components/CreatePost.jsx';
import { PostFilter } from '../components/PostFilter.jsx';
import { PostSorting } from '../components/PostSorting.jsx';
import { getPosts } from '../api/posts.js';
import { Header } from '../components/Header.jsx';

export function Blog() {
    // Standardize sort order values to 'asc'/'desc' to match typical API conventions
    const [author, setAuthor] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc'); // Changed from 'descending' to 'desc'

    // Combine filter/sort parameters into a single object for a cleaner queryFn call
    const queryParams = useMemo(() => ({ 
        author, 
        sortBy, 
        sortOrder 
    }), [author, sortBy, sortOrder]);

    const postsQuery = useQuery({
        queryKey: ['posts', queryParams], // Use the memoized object for stability
        queryFn: () => getPosts(queryParams),
        // Add keepPreviousData: true if you want smooth transitions while fetching
    });

    const posts = postsQuery.data ?? [];
    
    // Display loading/error states clearly
    if (postsQuery.isLoading) {
        return <div className="container">Loading posts...</div>;
    }

    if (postsQuery.isError) {
        // Cast the error to a generic Error type for safe access to the message property
        return <div className="container">Error fetching posts: {postsQuery.error.message}</div>;
    }
        
    return (
        <div style={{ padding: 8 }}>
            <Header />
            <br />
            <hr />
            
            <section aria-labelledby="create-post-heading">
                <h2>Create a New Post</h2>
                <CreatePost />
            </section>
            
            <br />
            <hr />

            <section aria-labelledby="filter-sort-heading">
                <h2>Filter & Sort Posts</h2>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <PostFilter 
                        field="author" 
                        value={author} 
                        onChange={setAuthor} // Pass the state setter directly as the handler
                    />
                    
                    <PostSorting 
                        fields={['createdAt', 'updatedAt', 'title']} // Added 'title' as a potential sort field
                        value={sortBy}
                        onChange={setSortBy}
                        orderValue={sortOrder}
                        onOrderChange={setSortOrder}
                    />
                </div>
            </section>

            <hr />

            <section aria-labelledby="post-list-heading">
                <h2>Available Posts ({posts.length})</h2>
                <PostList posts={posts}/>
            </section>
        </div>
    );
};