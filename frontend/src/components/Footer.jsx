import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                ProjectHub
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering agile teams to plan sprints, track deliverables, and ship high-impact software faster.
            </p>

            {/* System Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All systems operational
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/kanban" className="hover:text-white transition-colors duration-150">
                  Kanban Boards
                </Link>
              </li>
              <li>
                <Link to="/scheduler" className="hover:text-white transition-colors duration-150">
                  Sprint Scheduler
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors duration-150">
                  Project Tracker
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-slate-500 cursor-not-allowed">
                  Analytics
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-medium">Soon</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#docs" className="hover:text-white transition-colors duration-150">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#guides" className="hover:text-white transition-colors duration-150">
                  Scrum Playbook
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-white transition-colors duration-150">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#changelog" className="hover:text-white transition-colors duration-150">
                  Release Notes
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">
              Get product releases and agile management tips directly to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter work email"
                  className="w-full px-3 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ProjectHub Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-slate-400 transition-colors">Security</a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-400">
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;