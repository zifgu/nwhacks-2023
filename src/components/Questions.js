import React, {useState} from "react";
import "./Questions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export function Questions({onFinish}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [talents, setTalents] = useState([]);
  const [interests, setInterests] = useState([]);
  const [schoolSubjects, setSchoolSubjects] = useState([]);
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [personalityTraits, setPersonalityTraits] = useState([]);

  const [currentPage, setCurrentPage] = useState(2);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSubmit = () => {
    onFinish({
      name,
      age,
      talents,
      interests,
      schoolSubjects,
      extracurriculars,
      personalityTraits,
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
            <MultipleInput
              items={talents}
              onAddItem={(item) => setTalents([...talents, item])}
              onRemoveItem={(index) => setTalents(talents.filter((_, i) => i !== index))}
            />
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 5 && (
        <div className="page5">
          <div className="question-container">
            <div className="question-header">
              <label>What are you interested in? </label>
            </div>
            <MultipleInput
              items={interests}
              onAddItem={(item) => setInterests([...interests, item])}
              onRemoveItem={(index) => setInterests(interests.filter((_, i) => i !== index))}
            />
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 6 && (
        <div className="page6">
          <div className="question-container">
            <div className="question-header">
              <label>What are your favourite classes? </label>
            </div>
            <MultipleInput
              items={schoolSubjects}
              onAddItem={(item) => setSchoolSubjects([...schoolSubjects, item])}
              onRemoveItem={(index) => setSchoolSubjects(schoolSubjects.filter((_, i) => i !== index))}
            />
            <button className="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {currentPage === 7 && (
        <div className="page7">
          <div className="question-container">
            <div className="question-header">
              <label>What extracurricular activities do you like?</label>
            </div>
            <MultipleInput
              items={extracurriculars}
              onAddItem={(item) => setExtracurriculars([...extracurriculars, item])}
              onRemoveItem={(index) => setExtracurriculars(extracurriculars.filter((_, i) => i !== index))}
            />
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
            <MultipleInput
              items={personalityTraits}
              onAddItem={(item) => setPersonalityTraits([...personalityTraits, item])}
              onRemoveItem={(index) => setPersonalityTraits(personalityTraits.filter((_, i) => i !== index))}
            />
            <button className="button" onClick={handleSubmit}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MultipleInput({ items, onAddItem, onRemoveItem }) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.length > 0) {
      onAddItem(newItem);
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    onRemoveItem(index);
  }

  return (
    <div>
      <div className="answer-items">
        {
          items.map((item, index) => (
            <span
              key={item}
              className="answer-item"
            >
              {item}
              <FontAwesomeIcon
                className="answer-item-x"
                icon={faTimes}
                onClick={() => removeItem(index)}
              />
            </span>
          ))
        }
      </div>
      <input
        type="text"
        className="question-input"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        onClick={() => addItem()}
        className="button"
      >
        Add
      </button>
    </div>
  );
}