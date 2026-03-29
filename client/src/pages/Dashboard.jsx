// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/content", {
//       headers: {
//         Authorization: localStorage.getItem("token")
//       }
//     }).then(res => setData(res.data));
//   }, []);

//   return (
//     <div className="p-10">
//       <h1 className="text-xl mb-4">Student Dashboard</h1>

//       {data.map(item => (
//         <div key={item._id} className="border p-4 mb-4">
//           <h2>{item.title}</h2>

//           {item.type === "video" ? (
//             <video src={`http://localhost:5000${item.fileUrl}`} controls className="w-full"/>
//           ) : (
//             <a href={`http://localhost:5000${item.fileUrl}`} target="_blank">View PDF</a>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://education-app-1-ed4s.onrender.com/api/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-between">
      
      <Navbar role="student" />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Student Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-4 hover:scale-105 transition"
            >
              <h2 className="text-white font-semibold mb-3">
                {item.title}
              </h2>

              {item.type === "video" ? (
                <video
                  src={`https://education-app-1-ed4s.onrender.com${item.fileUrl}`}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-white">
                  <FileText size={40} />
                  <a
                    href={`https://education-app-1-ed4s.onrender.com${item.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-100"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
