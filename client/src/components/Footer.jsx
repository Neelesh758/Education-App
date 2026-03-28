export default function Footer() {
  return (
    <footer className="bg-white/20 backdrop-blur-lg border-t border-white/30 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        
        {/* Logo & Description */}
        <h1 className="text-2xl font-bold mb-2">🎓 Exam Buddy</h1>
        <p className="text-white/80 max-w-xl mx-auto mb-4">
          EduPortal is a modern learning platform providing students with
          notes, PDFs, and videos to make learning flexible, engaging, and
          efficient anytime, anywhere.
        </p>

        {/* Copyright */}
        <p className="text-white/70 text-sm">
          &copy; {new Date().getFullYear()} Exam Buddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
