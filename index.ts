import { Player } from './types/player';
import { Point, PointsData, Score, love, fifteen, thirty, points, forty, deuce, advantage, game, FortyData } from './types/score';
import { none, Option, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { isSamePlayer } from './types/player';

// -------- Tooling functions --------- //
export const playerToString = (player: Player): string => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};

export const otherPlayer = (player: Player): Player => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};

// Exercice 1
export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return 'Love';
    case 'FIFTEEN':
      return '15';
    case 'THIRTY':
      return '30';
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return `${pointToString(score.pointsData.playerOne)}-${pointToString(score.pointsData.playerTwo)}`;
    case 'FORTY':
      return `40-${pointToString(score.fortyData.otherPoint)}`;
    case 'DEUCE':
      return 'Deuce';
    case 'ADVANTAGE':
      return `Advantage ${playerToString(score.player)}`;
    case 'GAME':
      return `Game ${playerToString(score.player)}`;
  }
};

export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const scoreWhenAdvantage = (advantagedPlayer: Player, winner: Player): Score => {
  if (isSamePlayer(advantagedPlayer, winner)) {
    return game(winner);
  }
  return deuce();
};

export const scoreWhenForty = (currentForty: FortyData, winner: Player): Score => {
  if (isSamePlayer(currentForty.player, winner)) {
    return game(winner);
  }
  
  if (currentForty.otherPoint.kind === 'THIRTY') {
    return deuce();
  }
  
  return forty(currentForty.player, thirty());
};

export const scoreWhenGame = (winner: Player): Score => game(winner);

// Exercice 2
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const currentWinnerPoints = winner === 'PLAYER_ONE' ? current.playerOne : current.playerTwo;
  const currentLoserPoints = winner === 'PLAYER_ONE' ? current.playerTwo : current.playerOne;

  if (currentWinnerPoints.kind === 'THIRTY') {
    return forty(winner, currentLoserPoints);
  }

  const nextPoints = incrementPoint(currentWinnerPoints);
  if (nextPoints._tag === 'Some') {
    return winner === 'PLAYER_ONE' 
      ? points(nextPoints.value, currentLoserPoints)
      : points(currentLoserPoints, nextPoints.value);
  }

  return forty(winner, currentLoserPoints);
};

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'GAME':
      return scoreWhenGame(currentScore.player);
  }
};