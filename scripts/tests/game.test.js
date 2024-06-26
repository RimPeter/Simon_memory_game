/**
 * @jest-environment jsdom
 */
// Import the functions you want to test

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");


jest.spyOn(window, "alert").mockImplementation(() => { });

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
  test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
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
    test("should set game score to zero", () => {
      expect(game.score).toBe(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("Clear the currentGame array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 in the #score element", () => {
        expect(document.getElementById("score").innerText).toBe(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toBe("true");
        }
    });
});

describe("gameplay works correctly", () => {
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
  });
  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });
  test("addTurn adds a new turn to the game", () => {
    addTurn();
    expect(game.currentGame.length).toBe(2);
  });
  test("should add the correct class to the button", () => {
    let button = document.getElementById(game.currentGame[0]);
    lightsOn(game.currentGame[0]);
    expect(button.classList).toContain("light");
  });
  test("showTurns should update the game.turnNumber element", () => {
    game.turnNumber = 42;
    showTurns();
    expect(game.turnNumber).toBe(0);
  });
  test("should increment the score if the turn is correct", () => {
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    expect(game.score).toBe(1);
  });
  test("should call an alert if the turn is incorrect", () => {
    game.playerMoves.push("wrong");
    playerTurn();
    expect(window.alert).toBeCalledWith("Wrong move!");
  });
  test("should toggle turnInProgress to true when showTurns is called", () => {
    //game.turnInProgress = false;
    showTurns();
    expect(game.turnInProgress).toBe(true);
  });
  test("clicking during the computer sequence should fail", () => {
    showTurns();
    game.lastButton = "";
    document.getElementById("button2").click();
    expect(game.lastButton).toBe("");
  });
});