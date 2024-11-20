import React from "react";
import Header from "../components/Main/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mt-4">Welcome to the Home Page</h1>
      </main>
    </div>
  );
};

export default Home;
