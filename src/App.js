import React, {useState} from 'react';
import './App.css';
import {Visualization} from "./components/Visualization";
import {WelcomePage} from "./components/WelcomePage";
import {Questions} from "./components/Questions";
import {EndPage} from "./components/EndPage";
import {getExtracurriculars, getFutureJob, getHobbies, getMajor, getSchoolSubjects} from "./api/openai";

const nextLifeStages = [
  // 0: next = High school
  [
    {
      function: getSchoolSubjects,
      inputs: ["schoolSubjects"],
    },
    {
      function: getExtracurriculars,
      inputs: ["talents", "extracurriculars"],
    },
  ],
  // 1: next = University
  [
    {
      function: getMajor,
      inputs: ["personalityTraits", "schoolSubjects"],
    },
    {
      function: getExtracurriculars,
      inputs: ["talents", "extracurriculars"],
    },
  ],
  // 2: next = Adulthood
  [
    {
      function: getHobbies,
      inputs: ["interests"],
    },
    {
      function: getFutureJob,
      inputs: ["personalityTraits", "major"],
    },
  ],
];

const maxLifeStage = nextLifeStages.length;

const getDataValuesByType = (data) => {
  const result = {};
  for (let item of data) {
    if (item.type in result) {
      result[item.type].push(item.value);
    } else {
      result[item.type] = [item.value];
    }
  }
  return result;
}

const fetchNextLifeStage = async (lifeStage, dataSoFar) => {
  const functionsToCall = nextLifeStages[lifeStage];

  // Map: item type -> list of item values under that type
  const dataGroupedByType = getDataValuesByType(dataSoFar);

  const results = await Promise.allSettled(functionsToCall.map((f) => {
    const args = f.inputs.map((inputType) => dataGroupedByType[inputType]);
    return f.function(...args);
  }));

  const allResults = [];
  for (let result of results) {
    if (result.status === "fulfilled") {
      allResults.push(...result.value.map((obj) => ({
        ...obj,
        lifeStage: lifeStage + 1,
      })));
    } else {
      console.warn(result.reason);
    }
  }

  return allResults;
};

function App() {
  // Possible values: "welcome", "questions", "vis", "end"
  const [currentPage, setCurrentPage] = useState("welcome");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [lifeStage, setLifeStage] = useState(0);

  const initializeData = (info) => {
    const newData = [];
    newData.push(...info.talents.map((s) => ({value: s, type: "talents", lifeStage: 0})));
    newData.push(...info.interests.map((s) => ({value: s, type: "interests", lifeStage: 0})));
    newData.push(...info.schoolSubjects.map((s) => ({value: s, type: "schoolSubjects", lifeStage: 0})));
    newData.push(...info.extracurriculars.map((s) => ({value: s, type: "extracurriculars", lifeStage: 0})));
    newData.push(...info.personalityTraits.map((s) => ({value: s, type: "personalityTraits", lifeStage: 0})));
    setData(newData);
  }

  const handleNext = async (currentData) => {
    setLoading(true);

    const allResults = await fetchNextLifeStage(lifeStage, currentData);
    setLifeStage(lifeStage + 1);

    setData([...data, ...allResults]);

    setLoading(false);
  };

  let pageContent = null;
  switch (currentPage) {
    case "welcome":
      pageContent = <WelcomePage onStart={() => setCurrentPage("questions")}/>;
      break;
    case "questions":
      pageContent = <Questions onFinish={async (info) => {
        initializeData(info);
        setCurrentPage("vis");
      }}/>;
      break;
    case "vis":
      pageContent = (
        <Visualization
          data={data}
          loading={loading}
          onAddItem={(item) => setData([...data, item])}
          onDeleteItem={(item) => {
            const newData = data.filter((i) => i.lifeStage !== item.lifeStage || i.value !== item.value);
            setData(newData);
          }}
          onNext={async () => {
            if (lifeStage < maxLifeStage) {
              await handleNext(data);
            } else {
              setCurrentPage("end");
            }
          }}
        />
      );
      break;
    case "end":
      pageContent = <EndPage />;
  }

  return (
    <div id="app">
      {pageContent}
    </div>
  );
}

export default App;
