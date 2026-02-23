import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generate = async () => {
    if (!topic) return;
    setLoading(true);
    await API.post("/posts/generate", { topic });
    setTopic("");
    fetchPosts();
    setLoading(false);
  };

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);
    fetchPosts();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>AI Blog Generator</h2>
        <button className="logout" onClick={logout}>Logout</button>
      </div>

      <div className="generate-box">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter blog topic..."
        />
        <button onClick={generate}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.topic}</h3>
            <p>{post.content}</p>
            <button className="delete" onClick={() => deletePost(post._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}