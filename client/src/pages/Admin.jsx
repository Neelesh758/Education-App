import { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText, Video, Type } from "lucide-react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");

  // ✅ GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ PROTECT ROUTE (VERY IMPORTANT)
  if (!user || user.role !== "teacher") {
    return <Navigate to="/dashboard" />;
  }

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("type", type);

      await axios.post(
        "https://education-app-1-ed4s.onrender.com/api/content/upload",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Uploaded successfully ✅");
    } catch {
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-blue-600">
      
      {/* Navbar */}
      <Navbar role={user.role} />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 w-96">
          
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Admin Upload Panel
          </h1>

          {/* Title */}
          <div className="relative mb-4">
            <Type className="absolute left-3 top-2.5 text-white/70" size={18} />
            <input
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Type */}
          <div className="relative mb-4">
            {type === "video" ? (
              <Video className="absolute left-3 top-2.5 text-white/70" size={18} />
            ) : (
              <FileText className="absolute left-3 top-2.5 text-white/70" size={18} />
            )}

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full pl-10 py-2 rounded-lg bg-white/30 text-white outline-none focus:ring-2 focus:ring-white"
            >
              <option value="video" className="text-black">Video</option>
              <option value="pdf" className="text-black">PDF</option>
            </select>
          </div>

          {/* File Upload */}
          <label className="flex items-center justify-center gap-2 cursor-pointer bg-white/30 text-white py-2 rounded-lg hover:bg-white/40 transition mb-6">
            <UploadCloud size={18} />
            <span>{file ? file.name : "Choose File"}</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Upload Button */}
          <button
            onClick={uploadFile}
            className="w-full py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-100 active:scale-95 transition"
          >
            Upload
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
