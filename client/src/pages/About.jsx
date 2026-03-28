import { BookOpen, Video, FileText } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-purple-600">
      
      {/* Navbar */}
      <Navbar role="student" />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center px-6 py-12">
        <div className="max-w-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 text-white">
          
          <h1 className="text-3xl font-bold text-center mb-6">
            About This Platform
          </h1>

          <p className="text-white/90 leading-relaxed mb-6">
            This website is a modern learning platform designed to help students
            access educational content in a simple and organized way. Here,
            students can explore a wide range of study materials including
            detailed notes and engaging video lectures. The platform aims to make
            learning more flexible, allowing users to study anytime and anywhere
            at their own pace.
          </p>

          <p className="text-white/80 leading-relaxed mb-8">
            Whether you prefer reading PDFs for in-depth understanding or
            watching videos for visual learning, this platform provides both
            options in one place. It is built to support efficient learning by
            keeping all resources easily accessible and well-structured for
            students.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            
            <div className="bg-white/20 rounded-xl p-4">
              <Video className="mx-auto mb-2" />
              <h3 className="font-semibold">Video Learning</h3>
              <p className="text-sm text-white/70">
                Watch lectures anytime
              </p>
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <FileText className="mx-auto mb-2" />
              <h3 className="font-semibold">PDF Notes</h3>
              <p className="text-sm text-white/70">
                Easy access to study material
              </p>
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <BookOpen className="mx-auto mb-2" />
              <h3 className="font-semibold">Smart Learning</h3>
              <p className="text-sm text-white/70">
                Learn at your own pace
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}