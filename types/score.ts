import { Player } from './player';

export type Love = {
  kind: 'LOVE';
};

export type Fifteen = {
  kind: 'FIFTEEN';
};

export type Thirty = {
  kind: 'THIRTY';
};

export type Point = Love | Fifteen | Thirty;

export type PointsData = {
  playerOne: Point;
  playerTwo: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export type FortyData = {
  player: Player;
  otherPoint: Point;
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Deuce = {
  kind: 'DEUCE';
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export type Game = {
  kind: 'GAME';
  player: Player;
};

export type Score = Points | Forty | Deuce | Advantage | Game;

// Point constructors
export const love = (): Love => ({
  kind: 'LOVE',
});

export const fifteen = (): Fifteen => ({
  kind: 'FIFTEEN',
});

export const thirty = (): Thirty => ({
  kind: 'THIRTY',
});

// Score type constructors
export const points = (playerOnePoint: Point, playerTwoPoint: Point): Points => ({
  kind: 'POINTS',
  pointsData: {
    playerOne: playerOnePoint,
    playerTwo: playerTwoPoint,
  },
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export const game = (player: Player): Game => ({
  kind: 'GAME',
  player,
});