import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    //um tratamento para pegar o código que pode vir com parametro, por isso não pego o input direto do frontend
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    //a virgula no console.log entende que precisa exibir uma resposta com esses dois textos
    console.log("Realizando o download do vídeo:", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        //ele pega a duracao do video em segundos(/1000)
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos!")
        }
      })
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do erro:",
          error
        )
        reject(error)
      }) //recupera a informacao e salva
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
