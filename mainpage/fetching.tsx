
/**
 * method to fetch the song data from the api
 * @returns promise for the array that contains all of the songs from the backend
 */


export async function fetchDiffSongs(): Promise<any | undefined> {
  const url: string = `http://localhost:5151/allsongs?diff`;
  return  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json.Song.DiffSongs;
    });
}

export async function fetchEasySongs(): Promise<any | undefined> {
  console.log("1");
  const url: string = `http://localhost:5151/allsongs?easy`;
  return  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json.Song.EasySongs;
    });
}


/**
 * fetching the categories for the guess song
 * @param input, guess song
 * @returns the json object of the categories
 */
export async function fetchEasyCategories(input: String): Promise<any | undefined> {
    console.log("2");
  const newInput: String = input.replace(" ", "_");
  console.log("BUG")
  console.log("NEW INPUT "+newInput)
  console.log("BUGGGG")
  const url: string = "http://localhost:5151/songs?easysongs=" + newInput;
  return  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      console.log("jess "+newInput)
      if (json.Result === "Success") {
        
        return json.categories;
      } else{
        console.log(":))))")
        return json.Result;
      }
    });
}

export async function fetchDiffCategories(input: String): Promise<any | undefined> {
  const newInput: String = input.replace(" ", "_");
  const url: string = "http://localhost:5151/songs?diffsongs=" + newInput;
  return  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.Result === "Success") {
        return json.categories;
      } else {
        

        return json.Result;
      }
    });
}
    
