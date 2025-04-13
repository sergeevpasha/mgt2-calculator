export const useOpenAI = () => {
  const config = useRuntimeConfig();

  const generateGameNames = async (
    genre: string,
    topic: string,
    subtopic?: string,
    subgenre?: string
  ): Promise<string[]> => {
    let prompt = `Given a ${genre}`;
    if (subgenre && subgenre !== 'None') {
      prompt += ` ${subgenre}`;
    }
    prompt += ` game with ${topic}`;
    if (subtopic) {
      prompt += ` and ${subtopic}`;
    }
    prompt += ` themes, generate 12 creative and catchy game titles with the following word count distribution:
- 4 one-word titles
- 4 two-word titles
- 4 three-word titles
Return only the titles, one per line.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.public.openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              "You are a creative game title generator. Generate catchy and memorable game titles that reflect the game's genre and themes. Follow the exact word count distribution requested in the prompt.",
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content
        .split('\n')
        .map((name: string) => name.trim())
        .filter((name: string) => name.length > 0);
    }

    return [];
  };

  return {
    generateGameNames,
  };
};
