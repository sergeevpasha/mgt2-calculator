import action from './data/genres/action.json';
import adventure from './data/genres/adventure.json';
import buildingGame from './data/genres/building-game.json';
import economicSimulation from './data/genres/economic-simulation.json';
import fightingGame from './data/genres/fighting-game.json';
import firstPersonShooter from './data/genres/first-person-shooter.json';
import interactiveMovie from './data/genres/interactive-movie.json';
import platformer from './data/genres/platformer.json';
import puzzleGame from './data/genres/puzzle-game.json';
import racing from './data/genres/racing.json';
import realTimeStrategy from './data/genres/real-time-strategy.json';
import rolePlayingGame from './data/genres/role-playing-game.json';
import simulation from './data/genres/simulation.json';
import skillGame from './data/genres/skill-game.json';
import sportsGame from './data/genres/sports-game.json';
import strategy from './data/genres/strategy.json';
import survivalGame from './data/genres/survival-game.json';
import thirdPersonShooter from './data/genres/third-person-shooter.json';
import visualNovel from './data/genres/visual-novel.json';

export interface DesignFocus {
  focus1: number[];
  focus2: number[];
  direction: number[];
}

export interface Genre {
  id: string;
  name: string;
  // The game's own sprite, a file in public/icons/genres/.
  icon: string;
  // Genre names, plus NO_SUBGENRE.
  subgenres: string[];
  targetGroups: string[];
  designPriority: number[];
  // Slider values for each entry in `subgenres`.
  designFocus: Record<string, DesignFocus>;
  topics: string[];
}

// The game's own name for "no subgenre". The genre files list it as a subgenre with its own settings.
export const NO_SUBGENRE = 'None';

export const genres: Genre[] = [
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
];

export const defaultGenre: Genre = action;

export const findGenreById = (id: unknown): Genre | undefined => genres.find(genre => genre.id === id);

export const findGenreByName = (name: string): Genre | undefined => genres.find(genre => genre.name === name);
