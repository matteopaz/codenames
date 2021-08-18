const wordBank = [
  // Please put a space in long words to break the text
  "Dimension",
  "Space",
  "Coconut",
  "Drain",
  "Eat",
  "Fungus",
  "Green",
  "Helium",
  "Iguana",
  "Fender",
  "Submarine",
  "Laugh",
  "Man",
  "Netflix",
  "Orange",
  "Prince",
  "Quiche",
  "Reeds",
  "Trash",
  "Time",
  "Urn",
  "Violet",
  "Micro soft",
  "Xerox",
  "Mustang",
  "Ford",
  "Season",
  "Gift",
  "Pie",
  "Money",
  "Santa",
  "Apple",
  "Pluto",
  "Disney",
  "Skate board",
  "Snow",
  "Shovel",
  "Snail",
  "Recession"
]; // Add words with comma and quotation marks
const cells = document.querySelectorAll(".cell");
const buttons = {
  all: document.querySelectorAll("button"),
  fill: document.querySelectorAll("button")[0],
  howTo: document.querySelectorAll("button")[1],
  reveal: document.querySelectorAll("button")[2]
};
const score = document.getElementById("score");
const bs = document.querySelectorAll("#score > span")[0];
const rs = document.querySelectorAll("#score > span")[1];
const winCondition = document.querySelectorAll("#score > span")[2];
const c = console.log.bind(console);
var stopTiling = 0;
var colorPairArray = [];

class Modal {
  // Absolute overkill class to make a single modal, why did I waste my time on this
  constructor(content, classes) {
    this.content = content;
    this.newclasses = classes;
    this.modal = {};
  }

  classAdder(input, classes) {
    input.classList = [];
    if (classes) {
      classes.forEach((e) => {
        input.classList.add(e);
      });
      return input;
    }
  }

  create() {
    const elem = document.createElement("div");
    const childElem = document.createElement("div");
    let txt = document.createTextNode(this.content); // Creating content and objects

    childElem.appendChild(txt); // Appending the content
    elem.appendChild(childElem);
    elem.classList.add("modal");
    this.classAdder(elem, this.newclasses); // Defining style by class/es

    document.body.appendChild(elem);
    this.modal = elem; // Appending object and defining internal state
    return elem;
  }

  remove(elem) {
    if (!elem) this.elem.remove();
    if (elem) elem.remove();
  }

  update(content, classes) {
    this.modal.childNodes.forEach((e) => {
      e.remove();
    });
    this.classAdder(this.modal, classes);
    const childElem = document.createElement("div");
    let cont = document.createTextNode(content);
    childElem.appendChild(cont);
    this.modal.appendChild(childElem);
  }
}

c(
  "Spymasters: To operate from command line, type LogWordsPerColor(colorPairArray) to see the pairings (After filling board)"
); //

function LogWordsPerColor(arr) {
  // This is horribly cursed, not even I can read it. I have no idea what I did but it works and console logs the colors and their words, so its good enough
  let green = ["Green:"];
  let red = ["Red:"];
  let blue = ["Blue:"];
  let black = ["Black:"];
  arr.sort();
  arr.forEach((e, i, a) => {
    a[i] = e.split("_").pop();
  });
  arr = arr.join("");
  arr = arr.split(".");
  arr.sort();
  arr.splice(0, 1);
  arr.forEach((e, i, a) => {
    a[i] = e.substr(1, arr.length - 2);
  });

  for (let i = 0; i < 6; i++) {
    green = green.concat(arr[i]);
  }
  for (let i = 6; i < 15; i++) {
    red = red.concat(arr[i]);
  }
  for (let i = 15; i < 24; i++) {
    blue = blue.concat(arr[i]);
  }
  black = black.concat(arr[24]);
  c("For spymasters: Colors and their words");
  c(green);
  c(red);
  c(blue);
  c(black);
}

function shuffle(arr) {
  // May or may not have googled a bit of stackoverflow
  let rand, tmp;
  for (let i = arr.length - 1; i > 0; i--) {
    rand = Math.floor(Math.random() * (i + 1));
    tmp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = tmp;
  }
  return arr;
}

buttons.fill.addEventListener("click", (e) => {
  //Fill board with words, main logic
  let words = wordBank;
  let colors = () => {
    let constructorArray = [];
    for (let i = 0; i < 25; i++) {
      // This is utterly stupid, I should have just defined it manually, it constructs only 25 array elements
      if (i < 6) constructorArray.push(1); // 1 = GREEN TILE, TOTAL 6
      if (i >= 6 && i < 15) constructorArray.push(2); // 2 = RED TILE, TOTAL 9
      if (i >= 15 && i < 24) constructorArray.push(3); // 3 = BLUE TILE, TOTAL 9
      if (i === 24) constructorArray.push(4); // 4 = BLACK TILE, TOTAL 1
    }
    return constructorArray;
  };
  shuffle(words);
  const colorArray = shuffle(colors());
  let logArrayConstructor = [];
  words.forEach((e, i) => {
    try {
      cells[i].innerText = words[i];
      logArrayConstructor.push(i + "_" + e + ".");
    } catch (err) {
      // Haha nice one
    }
    // When it overflows, it throws errors but that is a side effect of intended behavior
  });
  colorArray.forEach((e, i) => {
    let clr = Number(colorArray[i]);
    try {
      cells[i].setAttribute("clr", clr);
      cells[i].toggleAttribute("revealed", 0);
      logArrayConstructor.push(i + "_" + e);
    } catch {
      // Ooh funny joke
    }
  });
  colorPairArray = logArrayConstructor;
  rs.innerText = "0";
  bs.innerText = "0";
  winCondition.innerText = "";
  stopTiling = 0;
  buttons.reveal.toggleAttribute("disabled", 0);
}); // as

const txt =
  "The game is CODENAMES. Divide into two different teams, red and blue and pick a spymaster per team. The objective of the game is to get your team to guess as many of their tiles as possible without hitting the black tile or giving points to the other team. The spymasters will be able to use the Show All button to see which words they must attempt to get the other team to guess. The clue will be in the format of one descriptive word, along with the number of words that it describes on the board. To lock in a vote, click the desired tile. Additionally, there will be a black square that should be avoided. If a team guesses the black tile, they will end the game immediately, counting squares. By the end of the game, whoever has hit more squares wins. Do not let the rest of the players see the revealed squares.";
var modal = new Modal(txt, ["modal"]);
modal.create();

buttons.howTo.addEventListener("click", (e) => {
  //Pulls up instructions
  if (modal.modal.classList.length < 2) {
    modal.update(txt, ["modal", "active"]);
  } else {
    modal.update(txt, ["modal"]);
  }
});

buttons.reveal.addEventListener("click", (e) => {
  cells.forEach((e, i) => {
    cells[i].toggleAttribute("revealed");
  });
  LogWordsPerColor(colorPairArray); // Console logs to tell spymaster their options
});

cells.forEach((e) => {
  e.addEventListener("mousedown", function watch(e) {
    if (!stopTiling && !(e.target.getAttribute("prevent") == "")) {
      const tmout = setTimeout(() => {
        if (e.target.getAttribute("clr") == 2) {
          let nr = Number(rs.innerText);
          nr++;
          rs.innerText = nr;
        }
        if (e.target.getAttribute("clr") == 3) {
          let nb = Number(bs.innerText);
          nb++;
          bs.innerText = nb;
        }
        if (e.target.getAttribute("clr") == 4) {
          let nb = Number(bs.innerText);
          let nr = Number(rs.innerText);
          if (nb > nr) var win = "Blue Wins!";
          if (nr > nb) var win = "Red Wins!";
          if (nr == nb) var win = "The game is tied!";
          winCondition.innerText = "The black tile was hit! " + win;
          stopTiling = 1;
        }
        e.target.toggleAttribute("revealed");
        clearTimeout(tmout);
      }, 900);
      e.target.toggleAttribute("prevent");
    }
  });
});
