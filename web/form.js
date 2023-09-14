import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

//função que observa o submit no formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  //reconhecer se o video é um shorts
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse video não parece ser um short.")
  }
  //ele divide a URL em duas partes, para pegar o ID do video e depois fazer o resumo certo
  const [_, params] = videoURL.split("/shorts/")
  // recorta novamente, para nao pegar parametros a mais no "compartilhar" do shorts
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do aúdio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result //Resumo
  content.classList.remove("placeholder")
})
