import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { About, Header, Work, Skills, Testimonial, Footer } from "./pages";
import "./App.scss";
import ChatInterface from "./pages/ChatInterface/ChatInterface";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main id="main-content">
        <Header />
        <About />
        <Work />
        <Skills />
        <Testimonial />
        <ChatInterface />
        <Footer />
      </main>
    </div>
  );
}
