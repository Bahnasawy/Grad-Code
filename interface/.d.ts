type files =
  | {
      [author: string]: {
        [text: string]: {
          content: string
          highlight: {
            [feature: string]: number[]
          }
        }
      }
    }
  | undefined

type features = {
  [feature: string]: {
    [author: string]: number
  }
  Disputed: {
    [author: string]: number
  }
}

type definition =
  | [
      {
        word: string
        phonetics: [
          {
            text: string
            audio: string
          }
        ]
        meanings: [
          {
            partOfSpeech: string
            definitions: [
              {
                definition: string
                example: string
                synonyms?: string[]
              }
            ]
          }
        ]
      }
    ]
  | undefined
