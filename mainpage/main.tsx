import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { easybool } from "../levelspage/Levels";
import "./main.css";
import {
  fetchDiffCategories,
  fetchDiffSongs,
  fetchEasyCategories,
  fetchEasySongs,
} from "./fetching";

export var round = 0;
var numGuess: number = 0;
var correct: boolean = false;
var gaveUp: boolean = false;
var easy: number = 2;
var mode: boolean = true;

interface ControlledInputProps {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSongs: Dispatch<SetStateAction<string>>;
  songArray2: Array<string>;
}

/**
 *
 * @param param0
 * @returns
 */
function ControlledInput({
  display,
  setDisplay,
  search,
  setSearch,
  setSongs,
  songArray2,
}: ControlledInputProps) {
  return (
    <div className="boxArea">
      <input
        id="auto"
        placeholder="Guess your song"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        aria-label={"input box"}
      />
      {display && (
        <div className={"scrollbox"} aria-label={"scrollable box"}>
          {songArray2
            .filter((songArray2) => songArray2.indexOf(search) > -1)
            .map((v, i) => {
              return (
                <div onClick={() => setSongs(v)} className="options" key={i}>
                  <span className={"song"}>{v}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

/**
 * the method to map the History Box function on to the input output pairs
 * @param results a list of string lists containing input outputs
 * @returns the list containing the div's containing input output
 */
function History({
  results,
  correctSong,
}: {
  results: string[];
  correctSong: string;
}) {
  const initialMap = new Map<String, Object>();
  const [category, setcorrectCategory] = useState(new Map<String, Object>());

  // useEffect(() => {
  //   setcorrectCategory(initialMap);
  //   fetchCategories(correctSong).then((data) => setcorrectCategory(data));
  // }, []);

  const correctMap = new Map(Object.entries(category));

  return (
    <div className="history" aria-label="history">
      {results.map((result, index) => (
        <div key={index}>
          <HistoryBox
            result={result}
            correctSong={correctSong}
            correctCategory={correctMap}
          />
        </div>
      ))}
    </div>
  );
}
/**
 * a method to create one history box
 * @param result a string list containing an input output pair
 * @returns the div containing the command and output from the pair in results
 */
function HistoryBox({
  result,
  correctSong,
  correctCategory,
}: {
  result: string;
  correctSong: string;
  correctCategory: Map<String, Object>;
}) {
  const initialMap = new Map<String, Object>();
  const initialcorrectMap = new Map<String, Object>();

  const [category, setCategory] = useState(new Map<String, Object>());
  const [answercategory, setcorrectCategory] = useState(
    new Map<String, Object>()
  );

  useEffect(() => {
    setCategory(initialMap);
    setcorrectCategory(initialcorrectMap);
    if (easybool) {
      console.log(easybool);
      console.log("easy");
      fetchEasyCategories(result).then((data) => setCategory(data));
      fetchEasyCategories(correctSong).then((data) => setcorrectCategory(data));
    } else {
      console.log(easybool);
      console.log("hard");
      // useEffect(() => {
      //   setCategory(initialMap);
      //   setcorrectCategory(initialcorrectMap);
      fetchDiffCategories(result).then((data) => setCategory(data));
      fetchDiffCategories(correctSong).then((data) => setcorrectCategory(data));
      // }, [] );
    }
  }, []);

  //console.log(round);

  console.log(category);

  const errorMap = new Map(Object.entries(category));

  if (errorMap.has("errorType")) {
    return (
      <div
        className="history-box-invalid"
        aria-label={"history box " + "number "}
      >
        <p className="matches">Please input a valid song!</p>
      </div>
    );
  } else {
    console.log("hi");
    const newMap = new Map(Object.entries(category));
    console.log(newMap);
    const correctMap = new Map(Object.entries(answercategory));
    console.log(correctMap);
    console.log(result);
    console.log(correctSong);

    const song = correctSong;

    //Gets the artist for the correct song
    const artist = correctMap.get("artist");

    //gets the year for the correct song
    var year = Number(correctMap.get("year"));

    //Gets the array of tags for the correct song
    var tag: Array<String> = [];
    if (Array.isArray(correctMap.get("tag"))) {
      var tag: Array<String> = correctMap.get("tag");
    }

    //Gets the position for the correct song
    const pos = correctMap.get("pos");

    var artistBool: string = "";
    var artistGuess = newMap.get("artist");

    if (artistGuess === artist) {
      artistBool = ":)";
    } else {
      artistBool = ":(";
    }
    var yearBool: string = "";
    var yearGuess = newMap.get("year");
    if (yearGuess > year) {
      yearBool = " older than " + yearGuess;
    } else if (yearGuess < year) {
      yearBool = " newer than " + yearGuess;
    } else {
      yearBool = ":)";
    }

    var tagGuess: Array<string> = newMap.get("tag");
    var tagLength = 0;

    if (Array.isArray(tagGuess)) {
      tagLength = tagGuess.length;
    }
    var tagMatch = "";

    for (var i = 0; i < tag.length; i++) {
      for (var j = 0; j < tagLength; j++) {
        if (tag[i] == tagGuess[j]) {
          tagMatch += tag[i] + " matches, ";
        }
      }
    }
    if (tagMatch == "") {
      tagMatch = "no matches";
    }

    var posBool: string = "";
    var posGuess = newMap.get("pos");
    if (posGuess > pos) {
      posBool = " ranked better than " + posGuess;
    } else if (posGuess < pos) {
      posBool = " ranked worse than " + posGuess;
    } else {
      posBool = ":)";
    }

    if (artistBool == ":)" && song == result) {
      numGuess = 10;
      correct = true;

      return (
        <div
          className="history-box-WON"
          aria-label={"history box " + "number " + numGuess}
        >
          <p className="matches">
            YOU WON, the song was {song} by {artist} ({year})
          </p>
        </div>
      );
    } else if (numGuess >= 8) {
      return (
        <div
          className="history-box-LOSE"
          aria-label={"history box " + "number " + numGuess}
        >
          <p className="matches">YOU LOSE</p>
        </div>
      );
    } else {
      return (
        <div
          className="history-box"
          aria-label={"history box " + "number " + numGuess}
        >
          <div className="matches">
            <p>
              {" "}
              Song Guessed: {result} by {artistGuess} ({yearGuess})
            </p>
            <p>
              {" "}
              Artist: {artistBool} || Year: {yearBool} || Genre: {tagMatch} ||
              Billboard position:{posBool}
            </p>
          </div>
        </div>
      );
    }
  }
}

interface NewRoundProps {
  addGuess: (guess: string) => any;
  songArray: Array<string>;
  addReset: Function;
  correctSong: String;
}

/**
 *
 * @param addInput, the function that we want to do on the current input
 * @returns the div for the current input box
 */
function NewInput({
  addGuess,
  songArray,
  addReset,
  correctSong,
}: NewRoundProps) {
  // Remember: let React manage state in your webapp. The current inputs are string fields.
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState(new Array());
  const [search, setSearch] = useState("");
  const setSongs = (song: React.SetStateAction<string>) => {
    setSearch(song);
    setDisplay(false);
  };
  return (
    <div className="New Output">
      <div className="CurrentOutput" aria-label="current output">
        {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}

        {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
        <fieldset>
          <ControlledInput
            search={search}
            setSearch={setSearch}
            display={display}
            setDisplay={setDisplay}
            setSongs={setSongs}
            songArray2={songArray}
          />
        </fieldset>
      </div>
      <div>
        <button
          onClick={() => {
            addReset();
            gaveUp = false;
          }}
        >
          {"restart"}
        </button>

        <button
          onClick={() => {
            if (numGuess >= 1) {
              console.log("hi");
              if (window.confirm("Are you sure you want to give up?")) {
                window.alert("The answer was " + correctSong);
                gaveUp = true;
                window.alert("Click the restart to try again");
              } else {
                window.alert("You decided to keep going.");
                window.alert("YOU GOT THIS");
              }
            } else {
              window.alert("GUESS FIRST");
            }
          }}
        >
          {"GIVE UP"}
        </button>

        <button
          onClick={() => {
            if (numGuess < 8 && !gaveUp) {
              if (search != null) {
                numGuess += 1;
                addGuess(search);
                setSearch("");
                //setNotification('')
              } else {
                //setNotification('Please provide a proper input command')
              }
              if (!songArray.includes(search)) {
                numGuess -= 1;
              }
            }
          }}
        >
          {/* The text displayed on the button */}
          {"guess song"}
        </button>
      </div>
    </div>
  );
}
// if (window.confirm("Press OK if you want to continue playing on Easy. For Hard press Cancel")) {
//     mode=true
// } else {
//   mode=false
// }
const Auto = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [song, setSong] = useState("");
  function reset() {
    numGuess = 0;
    setGuesses([]);
    console.log("reset");
    setSong(getRandomSong(data));
  }
  const [options, setOptions] = useState(new Array());
  const [search, setSearch] = useState("");

  let songArray = new Array();

  var correctSong: string = "";
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);

    if (easybool) {
      console.log(easybool);
      console.log("easyyy");
      fetchEasySongs().then((data) => {
        setData(data);
        setSong(getRandomSong(data));
      });
    } else {
      console.log("hardddd");
      fetchDiffSongs().then((data) => {
        setData(data);
        setSong(getRandomSong(data));
      });
    }
  }, []);
  console.log("numGUESS " + numGuess);
  function getRandomSong(data: string[]) {
    const mathRandom: number = Math.floor(Math.random() * data.length);
    const randomSong: string = data[mathRandom];
    return randomSong;
  }

  return (
    <div className="search-song-bar">
      <History results={guesses} correctSong={song} />

      <div className="newInput">
        <NewInput
          addGuess={(guess: string) => {
            const newGuesses = guesses.slice();
            newGuesses.push(guess);
            setGuesses(newGuesses);
          }}
          correctSong={song}
          addReset={reset}
          songArray={data}
        ></NewInput>
      </div>
    </div>
  );
};

export { Auto };
