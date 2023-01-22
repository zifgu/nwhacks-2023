const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);

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

  return {value: `${gptResponse.data.choices[0].text}`};
}
