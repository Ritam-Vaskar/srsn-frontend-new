// BlogUpload.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Blog.module.scss';
import SummaryApi from '../../../../common';

const BlogUpload = () => {
    const [blogs, setBlogs] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            content: '',
            image: null,
            sender: ''
        }
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(SummaryApi.BlogFetch.url, {
                method: SummaryApi.BlogFetch.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                setBlogs(data.blogs.reverse());
            } else {
                toast.error("Failed to fetch blogs.");
            }
        } catch (error) {
            toast.error("Error fetching blogs.");
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('image', data.image[0]);
        formData.append('sender', data.sender);

        try {
            const response = await fetch(SummaryApi.BlogUpload.url, {
                method: SummaryApi.BlogUpload.method,
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Blog uploaded successfully!");
                fetchBlogs();
                reset();
            } else {
                toast.error("Failed to upload blog.");
            }
        } catch (error) {
            toast.error("Error uploading blog.");
        }
    };

    const handleDelete = async (blogId) => {
        try {
            const response = await fetch(SummaryApi.BlogDelete.url, {
                method: SummaryApi.BlogDelete.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: blogId }),
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Blog deleted successfully!");
                fetchBlogs();
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            } else {
                toast.error("Failed to delete blog.");
            }
        } catch (error) {
            toast.error("Error deleting blog.");
        }
    };

    return (
        <div className={styles.blogContainer}>
            <h2>Create Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.blogForm}>
                <label>
                    Title:
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                </label>

                <label>
                    Content:
                    <textarea
                        {...register("content", { required: "Content is required" })}
                    ></textarea>
                    {errors.content && <p className={styles.error}>{errors.content.message}</p>}
                </label>

                <label>
                    Image:
                    <input
                        type="file"
                        {...register("image", { required: "Image is required" })}
                        accept="image/*"
                    />
                    {errors.image && <p className={styles.error}>{errors.image.message}</p>}
                </label>

                <label>
                    Sender:
                    <select name="sender" id="">
                        <option value="">Select sender</option>
                        <option value="school">School</option>
                        <option value="ashram">Ashram</option>
                    </select>
                </label>

                <button type="submit" className={styles.submitButton}>Upload Blog</button>
            </form>

            <h2>Uploaded Blogs</h2>
            {blogs.length > 0 ? (
                <table className={styles.blogTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Sender</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td>{blog.title}</td>
                                <td>{blog.content}</td>
                                <td>{blog.sender}</td>
                                <td><a href={blog.image} target="_blank" rel="noopener noreferrer">View Image</a></td>
                                <td>
                                    <button onClick={() => handleDelete(blog._id)} className={styles.deleteButton}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No blogs uploaded yet.</p>
            )}
        </div>
    );
};

export default BlogUpload;
