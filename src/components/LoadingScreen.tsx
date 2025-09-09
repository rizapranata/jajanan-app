"use client";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-14 w-full bg-gray-200 shadow-sm flex items-center px-4">
        <div className="h-6 w-32 bg-gray-300 rounded-md" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex flex-col gap-4 w-60">
          <div className="h-6 w-40 bg-gray-300 rounded-md" />
          <div className="h-6 w-36 bg-gray-300 rounded-md" />
          <div className="h-6 w-32 bg-gray-300 rounded-md" />
          <div className="h-6 w-44 bg-gray-300 rounded-md" />
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-8 w-1/3 bg-gray-300 rounded-md" />
          <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
          <div className="h-4 w-2/3 bg-gray-300 rounded-md" />
          <div className="h-64 w-full bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
