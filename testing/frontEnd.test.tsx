import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../app/App"
import { Auto } from "../mainpage/main";



// test home with play
test("renders home page and play page", async () => {
    render(<App />)
    // case insensitive regex:
    //const buttonElement = screen.getByText(/Try it!/i);
    // Better, less brittle:
    const link1= screen.getByText(new RegExp("Home"))
    const link2= screen.getByText(new RegExp("Play"))
    const link3= screen.getByText(new RegExp("How To"))

    expect(link1).toBeInTheDocument()
    expect(link2).toBeInTheDocument()
    expect(link3).toBeInTheDocument()

    userEvent.click(link2)
    await new Promise((r) => setTimeout(r, 100))
    const link4= screen.getByText("Easy (songs from 2000 onwards)")

    expect(link4).toBeInTheDocument()
    userEvent.click(link4)
    await new Promise((r) => setTimeout(r, 100))

    const button =screen.getByText(new RegExp("guess song"))
    expect(button).toBeInTheDocument()
    const input = screen.getByPlaceholderText("Guess your song")
    userEvent.type(
      input,
      "wiggle"
    )
    // click to submit
    userEvent.click(button)
    await new Promise((r) => setTimeout(r, 100))

    const response = screen.getByText(new RegExp("Song Guessed: wiggle"))
    expect(response).toBeInTheDocument()
  })

  // test restart and give up button
test("renders restart and give up button", () => {
    render(<App />)
    // case insensitive regex:
    //const buttonElement = screen.getByText(/Try it!/i);
    // Better, less brittle:
    const buttonElement = screen.getByText(new RegExp("restart"))
    expect(buttonElement).toBeInTheDocument()


    const buttonElement2 = screen.getByText(new RegExp("GIVE UP"))
    expect(buttonElement2).toBeInTheDocument()
  })
  
  // test two guesses together
test("command integration", async () => {
    render(<Auto />)
   
    const buttonElement = screen.getByText(new RegExp("guess song"))
    const input = screen.getByPlaceholderText("Guess your song")
    expect(input).toBeInTheDocument()
  
    // change input text box
    userEvent.type(
      input,
      "wiggle"
    )
    // click to submit
    userEvent.click(buttonElement)
    await new Promise((r) => setTimeout(r, 100))

    const response = screen.getByText(new RegExp("Song Guessed: wiggle"))
    expect(response).toBeInTheDocument()

     // change input text box
     userEvent.type(
        input,
        "tik tok"
      )
      // click to submit
      userEvent.click(buttonElement)
      await new Promise((r) => setTimeout(r, 100))
  
      const response2 = screen.getByText(new RegExp("Song Guessed: tik tok"))
      expect(response2).toBeInTheDocument()
  })


  // invalid song name
test("invalid song name", async () => {
    render(<Auto />)
    //get the button
    const buttonElement = screen.getByText(new RegExp("guess song"))
    const input = screen.getByPlaceholderText("Guess your song")
    expect(input).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  
    userEvent.type(input, "loooool")
    // click to submit
    userEvent.click(buttonElement)
    await new Promise((r) => setTimeout(r, 1000))
  
    const response = screen.getByText('Please input a valid song!')
    expect(response).toBeInTheDocument()
  })

   // empty song name
test("empty guess", async () => {
    render(<Auto />)
    //get the button
    const buttonElement = screen.getByText(new RegExp("guess song"))
    const input = screen.getByPlaceholderText("Guess your song")
    expect(input).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  
    userEvent.type(input, "")
    // click to submit
    userEvent.click(buttonElement)
    await new Promise((r) => setTimeout(r, 1000))
  
    const response = screen.getByText('Please input a valid song!')
    expect(response).toBeInTheDocument()
  })


//   test("out of guesses", async () => {
//     render(<App />)
//     //get the button
//     const buttonElement = screen.getByText(new RegExp("guess song"))
//     const input = screen.getByPlaceholderText("Guess your song")
//     expect(input).toBeInTheDocument()
//     expect(buttonElement).toBeInTheDocument()
  
//     jest.setTimeout(10000)
//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))

//     userEvent.type(input, "wiggle")
//     // click to submit
//     userEvent.click(buttonElement)
//     await new Promise((r) => setTimeout(r, 20000))
  
//     const response = screen.getByText('Please input a valid song!')
//     expect(response).toBeInTheDocument()
//   }, 100000)