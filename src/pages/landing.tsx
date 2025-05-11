// App.tsx or LandingPage.tsx
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { parseBoltArtifact } from "../helpers/baseStuctureParser";
import { useAtom } from "jotai";
import { codeSource } from "../store/atom/codeScource";
import Navbar from "../component/navbar";
import { toast } from 'react-toastify';
import { getTemplate, saveProject } from "../service/apiCalls";


export default function LandingPage() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useAtom(codeSource);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
    if (e.key === "Enter" && e.shiftKey) {
      setPrompt((prev) => prev + "\n");
    }
    if (e.key === "Escape") {
      setPrompt("");
    }
    if (e.key === "Backspace") {
      if (prompt.length === 0) {
        setPrompt("");
      }
    }
    if(e.key==="Enter" && prompt.trim().length >0){
      handleSubmit(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await getTemplate(prompt);
      if (!response.data.status) {
        toast.error(response.data.message);
        return;
      }
      const parsedResponse = parseBoltArtifact(response.data.baseStructure);
      const projectId = Math.random().toString(36).substring(2, 15);
      const sourceCode = await saveProject(projectId, parsedResponse);
      if (!sourceCode.data.status) {
        toast.error(sourceCode.data.message);
        return;
      }
      toast.success("Project created successfully");
      setSource(parsedResponse);
      navigate(`/chat/${projectId}`);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen font-sans">
      <Navbar />
      <section className="flex flex-col justify-center items-center text-center px-6 py-32 space-y-6 max-w-3xl mx-auto">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Build Smarter with AI-Powered Code Tools
        </motion.h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Instantly generate production-ready code from natural prompts.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-600 cursor-pointer hover:bg-pink-500 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-lg"
        >
          <Link to="/login">
            Get Started

          </Link>
        </motion.button>
      </section>

      <section
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-6 border-t border-gray-800 shadow-inner"
        data-aos="fade-up"
        id="prompt"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-white mb-2">Try a Prompt</h2>
          <form className="relative max-w-2xl mx-auto flex items-start">
            <span className="absolute left-4 top-5 text-pink-400 pointer-events-none">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.5 8.5l-8 8m0 0l-2 2m2-2l2 2m-2-2l-2-2m10-10l2 2m-2-2l2-2m-2 2l-2-2m2 2l2 2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6"
                />
              </svg>
            </span>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handlePromptKeyDown}
              placeholder="e.g. Generate a React login form"
              rows={1}
              className="w-full pl-14 pr-22 sm:pr-52 py-4 sm:py-5 rounded-lg sm:rounded-2xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-lg text-sm sm:text-lg transition-all duration-200 resize-none min-h-[56px] max-h-40 overflow-y-auto"
              style={{ boxSizing: "border-box" }}
            />

            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSubmit(e);
              }}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition flex items-center gap-2 text-base hidden sm:flex"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
              Generate
            </button>
          </form>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-1 px-2">
            <span>
              Enter a prompt or upload an image and let AI generate code for you
              instantly.
            </span>
            <span className="hidden sm:inline">
              Press <kbd className="bg-gray-700 px-1 rounded">Shift</kbd> +{" "}
              <kbd className="bg-gray-700 px-1 rounded">Enter</kbd> for a new
              line
            </span>
          </div>
        </div>
      </section>

      <section
        className="grid sm:grid-cols-3 gap-6 px-6 py-20 max-w-6xl mx-auto"
        data-aos="fade-up"
      >
        {["Fast Output", "Customizable", "Export to GitHub"].map(
          (feat, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
            >
              <h3 className="text-xl font-semibold text-pink-400">{feat}</h3>
              <p className="text-sm text-gray-300 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
