import React from 'react';
import NewsList from './components/NewsList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-6 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-bold">News Website</h1>
      </header>
      <main className="container mx-auto mt-8">
        <NewsList />
      </main>
    </div>
  );
}

export default App;
