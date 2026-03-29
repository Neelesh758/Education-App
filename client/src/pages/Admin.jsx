import { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText, Video, Type } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");

  const [newName, setNewName] = useState("");
  const [newRoll, setNewRoll] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("student");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Protect route
  if (!user || user.role !== "teacher") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-gradient-to-br from-purple-500 to-blue-600">
        Access Denied 🚫
      </div>
    );
  }

  // 📤 Upload content
  const uploadFile = async () => {
    try {
      if (!file || !title) {
        return alert("Please fill all fields");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("type", type);

      await axios.post(
        "https://education-app-1-ed4s.onrender.com/api/content/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Uploaded successfully ✅");

      setFile(null);
      setTitle("");
    } catch (err) {
      alert("Upload failed ❌");
    }
  };

  // 👤 Create user
  const createUser = async () => {
    try {
      if (!newName || !newRoll || !newPassword) {
        return alert("Please fill all fields");
      }

      const url =
        newRole === "teacher"
          ? "https://education-app-1-ed4s.onrender.com/api/auth/create-teacher"
          : "https://education-app-1-ed4s.onrender.com/api/auth/register";

      await axios.post(
        url,
        {
          name: newName,
          rollNumber: newRoll,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(`${newRole} created successfully ✅`);

      setNewName("");
      setNewRoll("");
      setNewPassword("");
    } catch (err) {
      alert("Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-blue-600">
      
      {/* Navbar */}
      <Navbar role={user.role} />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center p-6 gap-8">

        {/* Upload Panel */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 w-96">
          <h1 className="text-xl font-bold text-white text-center mb-4">
            Upload Content
          </h1>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/30 text-white outline-none"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/30 text-white outline-none"
          >
            <option value="video" className="text-black">Video</option>
            <option value="pdf" className="text-black">PDF</option>
          </select>

          <label className="flex items-center justify-center gap-2 cursor-pointer bg-white/30 text-white py-2 rounded hover:bg-white/40 transition mb-3">
            <UploadCloud size={18} />
            <span>{file ? file.name : "Choose File"}</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            onClick={uploadFile}
            className="w-full py-2 rounded bg-white text-purple-600 font-semibold hover:bg-purple-100"
          >
            Upload
          </button>
        </div>

        {/* Create User Panel */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 w-96">
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Create User
          </h2>

          <input
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/30 text-white"
          />

          <input
            placeholder="Roll Number"
            value={newRoll}
            onChange={(e) => setNewRoll(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/30 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/30 text-white"
          />

          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/30 text-white"
          >
            <option value="student" className="text-black">Student</option>
            <option value="teacher" className="text-black">Teacher</option>
          </select>

          <button
            onClick={createUser}
            className="w-full py-2 rounded bg-white text-purple-600 font-semibold hover:bg-purple-100"
          >
            Create {newRole}
          </button>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
