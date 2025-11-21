const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-300"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-start md:items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                SM
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Scrum Master</h3>
              <p className="text-sm text-gray-400">
                Tools and resources to run effective sprints.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Docs
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23 4.56c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.96-2.48 8.96 8.96 0 0 1-2.84 1.08 4.47 4.47 0 0 0-7.63 4.07A12.68 12.68 0 0 1 3.15 3.6a4.47 4.47 0 0 0 1.38 5.96 4.42 4.42 0 0 1-2.02-.56v.06a4.47 4.47 0 0 0 3.58 4.38c-.5.14-1.03.16-1.56.06a4.48 4.48 0 0 0 4.18 3.1A8.96 8.96 0 0 1 2 19.54a12.66 12.66 0 0 0 6.86 2.01c8.23 0 12.74-6.82 12.74-12.74 0-.19 0-.38-.01-.57A9.08 9.08 0 0 0 23 4.56z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.59.67.49A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Scrum Master. All rights reserved.
          </p>

          <form
            className="flex w-full max-w-md py-4 px-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="your@email.com"
              className="flex-1 min-w-0 px-3 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
