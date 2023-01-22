import React, {useState} from "react";
import "./Questions.css";

export function Questions({onFinish}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [talents, setTalents] = useState("");
  const [interests, setInterests] = useState("");
  const [schoolSubjects, setSchoolSubjects] = useState("");
  const [extracurriculars, setExtracurriculars] = useState("");
  const [personalityTraits, setPersonalityTraits] = useState("");

  const [currentPage, setCurrentPage] = useState(2);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSubmit = () => {
    onFinish({
      name,
      age,
      talents: [talents],
      interests: [interests],
      schoolSubjects: [schoolSubjects],
      extracurriculars: [extracurriculars],
      personalityTraits: [personalityTraits],
    });
  };

  return (
    <div>
      {currentPage === 2 && (
        <div className="page2">
          <div className="question-container">
            <div className="question-header">
              <label>What is your name? </label>
            </div>
            <input type="text" className="question-input" value={name} onChange={(e) => setName(e.target.value)}/>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 3 && (
        <div className="page3">
          <div className="question-container">
            <div className="question-header">
              <label>How old are you? </label>
            </div>
            <input type="text" className="question-input" value={age} onChange={(e) => setAge(e.target.value)}/>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 4 && (
        <div className="page4">
          <div className="question-container">
            <div className="question-header">
              <label>What are your talents? </label>
            </div>
            <input type="text" className="question-input" value={talents} onChange={(e) => setTalents(e.target.value)}/>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 5 && (
        <div className="page5">
          <div className="question-container">
            <div className="question-header">
              <label>What are your interests? </label>
            </div>
            <input type="text" className="question-input" value={interests} onChange={(e) => setInterests(e.target.value)}/>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 6 && (
        <div className="page6">
          <div className="question-container">
            <div className="question-header">
              <label>What are your favourite courses? </label>
            </div>
            <input type="text" className="question-input" value={schoolSubjects} onChange={(e) => setSchoolSubjects(e.target.value)}/>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 7 && (
        <div className="page7">
          <div className="question-container">
            <div className="question-header">
              <label>What are your extracurriculars? </label>
            </div>
            <input type="text" className="question-input" value={extracurriculars} onChange={(e) => setExtracurriculars(e.target.value)}/>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 8 && (
        <div className="page8">
          <div className="question-container">
            <div className="question-header">
              <label>What are some of your personality traits? </label>
            </div>
            <input type="text" className="question-input" value={personalityTraits} onChange={(e) => setPersonalityTraits(e.target.value)}/>
            <button className="button" onClick={handleSubmit}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}