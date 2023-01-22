const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);

function stringToList(listAsString) {
  const lines = listAsString.split("\n")
    .filter((str) => str.length > 0);

  return lines.map((line) => line.split(".")[1].trim());
}

export const getSchoolSubjects = async (query) => {
  let prompt = `List 5 school subjects related to ${query}:`;
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

  return results.map((result) => ({value: result, type: "schoolSubject"}));
}

export const getExtracurriculars = async (query) => {
  let prompt = `List 5 extracurricular activities related to ${query}:`;
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

  return results.map((result) => ({value: result, type: "extracurricular"}));
}

export const getHobbies = async (query) => {
  let prompt = `List 5 hobbies related to ${query}:`;
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

  return results.map((result) => ({value: result, type: "hobby"}));
}

export const getPersonality_Traits = async (query) => {
  let prompt = `List 5 personality traits related to ${query}:`;
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

  return results.map((result) => ({value: result, type: "personality"}));
}

export const getTalents = async (query) => {
  let prompt = `List 5 talents related to ${query}:`;
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

  return results.map((result) => ({value: result, type: "talents"}));
}