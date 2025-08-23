import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Subtle tech background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400/3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-green-500/10 border border-green-500/20 rounded-xl mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">O3</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-4 tracking-tight">
            <span className="text-green-400">&gt;</span> create-o3-app
          </h1>

          <p className="text-gray-400 text-lg mb-2 font-mono">
            project initialized successfully
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">ready to build</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-gray-500 font-mono text-sm mb-6 text-center">
            // configured stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "next.js", version: "15.x", color: "border-gray-600" },
              { name: "drizzle", version: "orm", color: "border-green-500/30" },
              {
                name: "oRPC",
                version: "type-safe",
                color: "border-blue-500/30",
              },
              {
                name: "arktype",
                version: "validation",
                color: "border-purple-500/30",
              },
              {
                name: "better-auth",
                version: "auth",
                color: "border-orange-500/30",
              },
              { name: "tailwind", version: "css", color: "border-cyan-500/30" },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`bg-gray-800/50 border ${tech.color} rounded-lg p-4 hover:bg-gray-800/70 transition-colors`}
              >
                <div className="font-mono text-white text-sm font-medium">
                  {tech.name}
                </div>
                <div className="font-mono text-gray-500 text-xs mt-1">
                  {tech.version}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-green-400 font-mono text-sm">○</span>
            <span className="text-gray-400 font-mono text-sm">next steps</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-400 font-mono text-sm">1.</span>
              <span className="text-gray-300 font-mono text-sm">
                edit{" "}
                <code className="text-green-400 bg-gray-900/50 px-2 py-1 rounded">
                  app/page.tsx
                </code>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400 font-mono text-sm">2.</span>
              <span className="text-gray-300 font-mono text-sm">
                run{" "}
                <code className="text-cyan-400 bg-gray-900/50 px-2 py-1 rounded">
                  npm run dev
                </code>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400 font-mono text-sm">3.</span>
              <span className="text-gray-300 font-mono text-sm">
                build something amazing
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://github.com/your-repo/create-o3-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors font-mono text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>star on github</span>
          </Link>
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 px-6 py-3 rounded-lg transition-colors font-mono text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>view docs</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
