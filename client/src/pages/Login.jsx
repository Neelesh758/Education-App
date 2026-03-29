// import { useState } from "react";
// import axios from "axios";

// export default function Login() {
//   const [rollNumber, setRoll] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     const res = await axios.post("http://localhost:5000/api/auth/login", {
//       rollNumber,
//       password
//     });

//     localStorage.setItem("token", res.data.token);

//     if (res.data.role === "teacher") {
//       window.location = "/admin";
//     } else {
//       window.location = "/dashboard";
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
//       <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-2xl p-8 w-80">
    
//         <h2 className="text-2xl font-bold text-white text-center mb-6">
//           Welcome Back
//         </h2>

//         <input
//           placeholder="Roll Number"
//           onChange={e => setRoll(e.target.value)}
//           className="w-full mb-4 px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={e => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-100 transition duration-300"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//     // <div className="flex justify-center items-center h-screen">
//     //   <div className="p-6 bg-white shadow rounded">
//     //     <input placeholder="Roll Number" onChange={e=>setRoll(e.target.value)} className="border p-2 mb-2 w-full"/>
//     //     <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} className="border p-2 mb-2 w-full"/>
//     //     <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">Login</button>
//     //   </div>
//     // </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function Login() {
  const [rollNumber, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://education-app-1-ed4s.onrender.com/api/auth/login", {
        rollNumber,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        name: res.data.name,
        role: res.data.role
      }));

      if (res.data.role === "teacher") {
        window.location = "/admin";
      } else {
        window.location = "/dashboard";
      }
    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex-col gap-4">
      
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-80">
        
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Roll Number */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-2.5 text-blue-600" size={18} />
          <input
            placeholder="Roll Number"
            value={rollNumber}
            onChange={e => setRoll(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-2.5 text-yellow-500" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          />

          {/* Toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-white/70 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-100 active:scale-95 transition duration-200"
        >
          Login
        </button>

        
      </div>
    </div>
  );
}
