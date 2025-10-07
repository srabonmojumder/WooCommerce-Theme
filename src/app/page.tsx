export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Next.js
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A fresh Next.js application with Tailwind CSS
        </p>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p className="text-gray-600">
              Edit <code className="bg-gray-100 px-2 py-1 rounded">src/app/page.tsx</code> to customize this page.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
