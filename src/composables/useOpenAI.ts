export const useOpenAI = () => {
  // Calls our own server proxy (/api/generate-names) which holds the OpenAI
  // key server-side. The key is never exposed to the browser.
  const generateGameNames = (
    genre: string,
    topic: string,
    subtopic?: string,
    subgenre?: string
  ): Promise<string[]> => {
    return $fetch<string[]>('/api/generate-names', {
      method: 'POST',
      body: { genre, topic, subtopic, subgenre },
    });
  };

  return {
    generateGameNames,
  };
};
