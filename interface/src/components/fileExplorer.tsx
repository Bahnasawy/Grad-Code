import React from "react"

const FileExplorer = ({
  analysis,
  generateRandomString,
  setSelectedText,
}: any) => {
  return (
    <ul>
      <li>
        {Object.keys(analysis).map((author: string) => {
          return (
            <div key={generateRandomString()}>
              <p className="p-1 text-sm font-semibold select-none">{author}</p>
              <div className="ml-1 border-l border-gray-400">
                {Object.keys(analysis[author]).map((title: string) => {
                  return (
                    <p
                      className="p-1 text-xs transition duration-100 ease-in-out cursor-pointer select-none hover:bg-gray-400 active:bg-gray-600"
                      key={generateRandomString()}
                      onClick={() =>
                        setSelectedText({
                          selectedAuthor: author,
                          selectedTitle: title,
                        })
                      }
                    >
                      {title}
                    </p>
                  )
                })}
              </div>
            </div>
          )
        })}
      </li>
    </ul>
  )
}

export default FileExplorer
