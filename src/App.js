import React, {useState} from 'react';
import './App.css';
import {Visualization} from "./components/Visualization";
import ImageOne from "./components/ImageOne";
import ImageTwo from "./components/ImageTwo";
import ImageThree from "./components/ImageThree";

const initialData = [
  {
    value: "Math class",
    lifeStage: 0,
  },
  {
    value: "Dance class",
    lifeStage: 0,
  },
  {
    value: "Cheerful",
    lifeStage: 0,
  },
  {
    value: "Helpful",
    lifeStage: 0,
  },
  {
    value: "Shy",
    lifeStage: 0,
  },
  {
    value: "Piano lessons",
    lifeStage: 0,
  },
  {
    value: "Finance",
    lifeStage: 0,
  },
  {
    value: "Math class",
    lifeStage: 1,
  },
  {
    value: "Art class",
    lifeStage: 1,
  },
  {
    value: "Ballet lessons",
    lifeStage: 1,
  },
  {
    value: "Volunteer at hospital",
    lifeStage: 1,
  },
  {
    value: "Perform at a local theatre",
    lifeStage: 1,
  },
  {
    value: "Perform at a local theatre",
    lifeStage: 2,
  },
];

function App() {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Talent, setTalent] = useState("");
  const [Interest, setInterest] = useState("");
  const [School_classes, set_School_classes] = useState("");
  const [Extracurriculars, setExtracurriculars] = useState("");
  const [Personality_traits, set_Personality_traits] = useState("");

  const [currentPage, setCurrentPage] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  return (
    <div id="app">
      <form onSubmit={handleSubmit}>
        {currentPage === 1 && (
          <div className="main">
            <h1>Who  Will  You  Be?
              <div className="roller">
                <span className="rolltext">
                  PROGRAMMER<br/>
                  DOCTOR<br/>
                  ARTIST<br/>
                  <span className="role-text">LET'S FIND OUT</span><br/>
                </span>
              </div>
            </h1>
            <button>
              <div className="arrow">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        )}
        {currentPage === 2 && (
          <div className="page2">
            <div className="question-container">
              <div className="question-header">
                <label>What is your name? </label>
              </div>
              <input type="text" className="question-input" value={Name} onChange={(e) => setName(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 3 && (
          <div className="page3">
            <div className="question-container">
              <div className="question-header">
                <label>How old are you? </label>
              </div>
              <input type="text" className="question-input" value={Age} onChange={(e) => setAge(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 4 && (
          <div className="page4">
            <div className="question-container">
              <div className="question-header">
                <label>What are your talents? </label>
              </div>
              <input type="text" className="question-input" value={Talent} onChange={(e) => setTalent(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 5 && (
          <div className="page5">
            <div className="question-container">
              <div className="question-header">
                <label>What are your interests? </label>
              </div>
              <input type="text" className="question-input" value={Interest} onChange={(e) => setInterest(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 6 && (
          <div className="page6">
            <div className="question-container">
              <div className="question-header">
                <label>What are your school classes? </label>
              </div>
              <input type="text" className="question-input" value={School_classes} onChange={(e) => set_School_classes(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 7 && (
          <div className="page7">
            <div className="question-container">
              <div className="question-header">
                <label>What are your extracurriculars? </label>
              </div>
              <input type="text" className="question-input" value={Extracurriculars} onChange={(e) => setExtracurriculars(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 8 && (
          <div className="page8">
            <div className="question-container">
              <div className="question-header">
                <label>What are some of your personality traits? </label>
              </div>
              <input type="text" className="question-input" value={Personality_traits} onChange={(e) => set_Personality_traits(e.target.value)}/>
              <button type="Submit" className="button">Next</button>
            </div>
          </div>
        )}
        {currentPage === 9 && (
          <div className="page9">
            <ImageOne />
            <ImageTwo />
            <ImageThree />
          </div>
        )}
      </form>
    </div>
  );
}

// function App() {
//   const [data, setData] = useState(initialData);
//
//   return (
//     <Visualization
//       data={data}
//       onAddItem={(item) => setData([...data, item])}
//       onDeleteItem={(item) => {
//         const newData = data.filter((i) => i.lifeStage !== item.lifeStage || i.value !== item.value);
//         setData(newData);
//       }}
//     />
//   );
// }

export default App;
