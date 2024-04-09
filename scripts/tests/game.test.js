/**
 * @jest-environment jsdom
 */

// Import the functions you want to test
const { game, newGame, showScore } = require("../game");
const { beforeAll, test } = require("@jest/globals");

beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("index.html", "UTF-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("choices key contains the correct values", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];
        document.getElementById("score").innerText = 42;
        newGame();
    });
    test("score is 0", () => {
        expect(game.score).toBe(0);
    });
    test("Clear the playerMoves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("Clear the currentGame array", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("should display 0 in the #score element", () => {
        expect(document.getElementById("score").innerText).toBe(0);
    });
});