const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);

function stringToList(listAsString) {
  const lines = listAsString.split("\n")
    .filter((str) => str.trim().length > 0);
  return lines.map((line) => line.split(".")[1].trim());
}

export const getSchoolSubjects = async (...query) => {
  let prompt = `List 5 school subjects related to ${query.join(", ")}:`;

  console.log(prompt);

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    maxTokens: 200,
    temperature: 0.5,
    topP: 1,
    presencePenalty: 0.5,
    frequencyPenalty: 0.52,
    bestOf: 1,
    n: 1
  });

  const results = stringToList(gptResponse.data.choices[0].text);

  return results.map((result) => ({value: result, type: "schoolSubjects"}));
}

export const getExtracurriculars = async (...query) => {
  let prompt = `List 5 extracurricular activities related to ${query.join(", ")}:`;

  console.log(prompt);

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    maxTokens: 200,
    temperature: 0.5,
    topP: 1,
    presencePenalty: 0.5,
    frequencyPenalty: 0.52,
    bestOf: 1,
    n: 1
  });

  const results = stringToList(gptResponse.data.choices[0].text);

  return results.map((result) => ({value: result, type: "extracurriculars"}));
}

export const getHobbies = async (...query) => {
  let prompt = `List 5 hobbies related to ${query.join(", ")}:`;

  console.log(prompt);

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    maxTokens: 200,
    temperature: 0.5,
    topP: 1,
    presencePenalty: 0.5,
    frequencyPenalty: 0.52,
    bestOf: 1,
    n: 1
  });

  const results = stringToList(gptResponse.data.choices[0].text);

  return results.map((result) => ({value: result, type: "interests"}));
}

export const getMajor = async (personalityTraits, schoolSubjects) => {
  let prompt = `List 5 possible college majors for someone ${personalityTraits.join(",")} and whose favourite classes are ${schoolSubjects.join(",")}:`;

  console.log(prompt);

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    maxTokens: 200,
    temperature: 0.5,
    topP: 1,
    presencePenalty: 0.5,
    frequencyPenalty: 0.52,
    bestOf: 1,
    n: 1
  });

  const results = stringToList(gptResponse.data.choices[0].text);

  return results.map((result) => ({value: result, type: "major"}));
}

export const getFutureJob = async (personalityTraits, major) => {
  let prompt = `List 5 possible careers for a ${major} major who is ${personalityTraits.join(", ")}:`;

  console.log(prompt);

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    maxTokens: 200,
    temperature: 0.5,
    topP: 1,
    presencePenalty: 0.5,
    frequencyPenalty: 0.52,
    bestOf: 1,
    n: 1
  });

  const results = stringToList(gptResponse.data.choices[0].text);

  return results.map((result) => ({value: result, type: "jobs"}));
}
