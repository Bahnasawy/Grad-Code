type files = {
  [author: string]: {
    [text: string]: string
  }
}

type definition = [
  {
    word: string
    phonetics?: [
      {
        text: string
        audio: string
      }
    ]
    meanings?: [
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
