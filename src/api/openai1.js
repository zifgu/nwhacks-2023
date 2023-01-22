const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);

export const getSchoolSubjects = async (query) => {
  let prompt = `middle school subjects related to ${query}:`;
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 50,
    temperature: 0,
    topP: 1,
    presencePenalty: 0.3,
    frequencyPenalty: 0.3,
    bestOf: 1,
    n: 1
  });

  return {value: `${gptResponse.data.choices[0].text}`};
}
