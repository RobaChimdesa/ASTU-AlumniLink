import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-white text-center">
      {/* <Navbar /> */}
      <section className="py-16 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">Welcome to ASTUALUMNILINK</h1>
        <p className="text-lg mt-4">Connect with alumni, students, faculty, and industry professionals.</p>
        <a href="/signup" className="mt-6 inline-block bg-orange-500 px-6 py-3 text-white font-bold rounded-lg">Get Started</a>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
