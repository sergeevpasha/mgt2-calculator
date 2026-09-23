import type { Genre } from '~/types';

import action from './action.json';
import adventure from './adventure.json';
import buildingGame from './building-game.json';
import economicSimulation from './economic-simulation.json';
import fightingGame from './fighting-game.json';
import firstPersonShooter from './first-person-shooter.json';
import interactiveMovie from './interactive-movie.json';
import platformer from './platformer.json';
import puzzleGame from './puzzle-game.json';
import racing from './racing.json';
import realTimeStrategy from './real-time-strategy.json';
import rolePlayingGame from './role-playing-game.json';
import simulation from './simulation.json';
import skillGame from './skill-game.json';
import sportsGame from './sports-game.json';
import strategy from './strategy.json';
import survivalGame from './survival-game.json';
import thirdPersonShooter from './third-person-shooter.json';
import visualNovel from './visual-novel.json';

const genres: Record<string, Genre> = {
  action,
  adventure,
  buildingGame,
  economicSimulation,
  fightingGame,
  firstPersonShooter,
  interactiveMovie,
  platformer,
  puzzleGame,
  racing,
  realTimeStrategy,
  rolePlayingGame,
  simulation,
  skillGame,
  sportsGame,
  strategy,
  survivalGame,
  thirdPersonShooter,
  visualNovel,
};

export default genres;

// `combos` are thematic suggestions, not game data: some pairs use a topic that doesn't fit the genre
// (or isn't in the game at all), and some repeat in reverse order. Keep only pairs whose two topics
// both fit the genre, once each, sorted like the topic lists.
export const getTopicPairs = (genre: Genre): [string, string][] => {
  const fits = new Set(genre.topics);
  const seen = new Set<string>();
  const pairs: [string, string][] = [];
  for (const [first, second] of genre.combos) {
    const key = [first, second].sort().join('\n');
    if (first !== second && fits.has(first) && fits.has(second) && !seen.has(key)) {
      seen.add(key);
      pairs.push([first, second]);
    }
  }
  return pairs.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
};
