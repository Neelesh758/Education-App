import { Mail, User, MessageSquare, Send } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex justify-between flex-col" >
      
      <Navbar role="student" />

      <div className="flex justify-center items-center px-6 py-12">
        
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 text-white">
          
          <h1 className="text-3xl font-bold text-center mb-6">
            Contact Us
          </h1>

          <p className="text-center text-white/80 mb-8">
            Have questions or feedback? Fill out the form below and we’ll get back to you.
          </p>

          {/* FORM */}
          <form
            action="https://formspree.io/f/xgopodrz" // replace with your Freeform/Formspree link
            method="POST"
            className="space-y-5"
          >
            
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-white/70" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/70" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-white/70" size={18} />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-100 transition flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
}