import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiAlertTriangle, FiGithub } from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaUser } from "react-icons/fa";
import DhoniRegret from "./assets/DhoniRegret.mp4";
import DidDhoni from "./assets/DidDhoni.mp4";
import NotMatched from "./assets/NotMatched.mp4";
import sakshi from "./assets/sakshi.mp4";
import SuccessDhoni from "./assets/SuccessDhoni.mp4";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [videoToShow, setVideoToShow] = useState(null);
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [emojiToShow, setEmojiToShow] = useState("");
  const handleInputChange = (e) => {
    setInputText(e.target.value.toLowerCase());
    setWarningMessage("");
  };

  const controls = useAnimation();

  useEffect(() => {
    if (videoToShow) {
      controls.start({ scale: 1, opacity: 1 });
    } else {
      controls.start({ scale: 0, opacity: 0 });
    }
  }, [videoToShow, controls]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let newVideoToShow = null;
    let relationMessage = "";
    let newEmojiToShow = "😐"; // Default emoji for NotMatched case

    if (inputText.includes("sakshi")) {
      newVideoToShow = sakshi;
      newEmojiToShow = "😐"; // Emoji for sakshi case
    } else if (inputText.includes("kiara")) {
      newVideoToShow = DidDhoni;
      newEmojiToShow = "🌝"; // Emoji for DidDhoni case
      relationMessage = " Thala For A Reason !!!";

    } else if (
      inputText.includes("dhoni") ||
      inputText.includes("msd") ||
      inputText.includes("mahi")
    ) {
      newVideoToShow = DhoniRegret;
      relationMessage = `No. of letters in ${inputText} = ${inputText.length}`;
    }
    else if ( inputText.includes("thala")){
      newVideoToShow = SuccessDhoni;
    }
    else if(inputText.length===7){
      newVideoToShow = SuccessDhoni;
      relationMessage = `No. of letters in ${inputText} = ${inputText.length}`;
    }
    else if (/\d/.test(inputText)) {
      const digits = inputText.match(/\d/g);
      const sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);
      if (digits.length === 1 && sum === 7) {
        relationMessage = `${digits.join(" + ")} + 0 = ${sum}. | Thala For A Reason !!!`;
        newVideoToShow = SuccessDhoni;
        newEmojiToShow = "😀"; // Emoji for SuccessDhoni case
      } else if (sum === 7 )  {
        relationMessage = `${digits.join(" + ")} = ${sum}. | Thala For A Reason !!!`;
        newVideoToShow = SuccessDhoni;
        newEmojiToShow = "😀"; // Emoji for SuccessDhoni case
      } else {
        newVideoToShow = NotMatched;
      }
    }
    
    
    else {
      newVideoToShow = NotMatched;
    }

    setVideoToShow(newVideoToShow);
    setVideoKey((prevKey) => prevKey + 1);
    setWarningMessage(relationMessage);
    setEmojiToShow(newEmojiToShow); // Set the corresponding emoji
  };

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="bg-slate-800">
      <div className="flex  px-12 flex-col justify-center items-center min-h-screen text-white ">
        <div className="w-full p-8">
          <div className="flex items-center justify-center">
            <span className=" text-6xl" role="img" aria-label="Emoji">
              {emojiToShow}
            </span>
          </div>

          <div className="text-red-500 text-3xl text-center mt-3">
            Do not enter words like "Sakshi", "Dhoni", "Kiara"!
          </div>
          {warningMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-yellow-500 text-2xl text-center mt-3"
            >
              {`${warningMessage}`}
            </motion.div>
          )}

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col lg:flex-row items-center justify-center mt-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none text-black mb-3 lg:mb-0 lg:mr-2"
              placeholder="Enter text..."
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="bg-slate-500 text-white rounded px-4 py-2 flex items-center justify-center"
            >
              <span className="mr-1">Check</span>
              <FiAlertTriangle />
            </motion.button>
          </form>
        </div>

        <div className="w-full  flex justify-center items-center">
          <motion.div onClick={togglePlayPause}
          initial={{ scale: 0, opacity: 0 }}
          animate={controls}
          className="w-full h-96"
          >
            {videoToShow && (
              <video
                ref={videoRef}
                key={videoKey}
                autoPlay
                loop
                controls={false}
                className="w-full h-96"
              >
                <source src={videoToShow} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </motion.div>
        </div>
        <footer className="text-center flex justify-center items-center  py-8 text-gray-400 w-full ">
        <p>Made by Priyanshu | Let's Connect: </p>
        <span className="flex  items-center justify-center">
          <a
            href="https://github.com/Priyanshu-web-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FiGithub className="text-2xl hover:text-gray-300" />
          </a>
          <a
            href="https://priyanshu-sharma-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FaUser className="text-2xl hover:text-gray-300" />
          </a>

          <a
            href="https://www.instagram.com/__priyanshu.sharma/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FaInstagram className="text-2xl hover:text-gray-300" />
          </a>

          <a
            href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FaLinkedin className="text-2xl hover:text-gray-300" />
          </a>
        </span>
      </footer>
      </div>
    
    </div>
  );
};

export default App;