// BlogUpload.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Blog.module.scss';
import SummaryApi from '../../../../common';
import uploadImg from '../../../../helper/uploadImg';
import { makeAuthenticatedRequest } from '../../../../helper/tokenManager';

const BlogUpload = () => {
    const [blogs, setBlogs] = useState([]);
    

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            content: '',
            sender: ''
        }
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.BlogFetch.url, {
                method: SummaryApi.BlogFetch.method
            });
            const data = await response.json();
            if (data.success) {
                setBlogs(data.blog.reverse());
            } else {
                toast.error("Failed to fetch blogs.");
            }
        } catch (error) {
            toast.error("Error fetching blogs.");
        }
    };
    const [image, setimage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024) { // Check image type and size
            setIsUploading(true);
            try {
                const imageUrl = await uploadImg(file);
                if (imageUrl.url) {
                    setimage(imageUrl.url);
                    // setValue("image", imageUrl.url);
                    toast.success("Image uploaded successfully!");

                } else {
                    toast.error("Image upload was successful, but URL is missing.");
                }
            } catch (error) {
                toast.error("Failed to upload image. Please try again.");
            } finally {
                setIsUploading(false);
            }
        } else {
            toast.error("Please select a valid image file under 2MB.");
        }
    };

    const onSubmit = async (data) => {

        console.log(data);

        try {
            const response = await makeAuthenticatedRequest(SummaryApi.BlogAdd.url, {
                method: SummaryApi.BlogAdd.method,
                body: JSON.stringify({ ...data, image })
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
            const response = await makeAuthenticatedRequest(SummaryApi.BlogDelete.url, {
                method: SummaryApi.BlogDelete.method,
                body: JSON.stringify({ _id: blogId })
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

                <label> Picture</label>
                <input type="file" onChange={handleChange} className={styles.fileInput} />
                {isUploading ? <p>Uploading...</p> : image && <img src={image} alt="Profile" width="100" className={styles.img} />}

                <label>
                    Sender:
                    <select
                        {...register("sender", { required: "Sender is required" })}
                        className={styles.selectInput}
                    >
                        <option value="">Select sender</option>
                        <option value="school">School</option>
                        <option value="ashram">Ashram</option>
                    </select>
                </label>
                {errors.sender && <p className={styles.error}>{errors.sender.message}</p>}

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
