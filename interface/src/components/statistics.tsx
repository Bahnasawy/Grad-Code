import React from "react"

const Statistics = ({
  features,
  generateRandomString,
  setSelectedFeature,
}: any) => {
  return (
    <ul>
      <li>
        {Object.keys(features).map((feature: string) => {
          return (
            <div key={generateRandomString()}>
              <div
                className="flex justify-between p-1 text-sm font-semibold transition duration-100 ease-in-out cursor-pointer select-none hover:bg-gray-400 active:bg-gray-600"
                onClick={() => setSelectedFeature(feature)}
              >
                <p>{feature}</p> {feature !== "Disputed" && <p>33%</p>}
              </div>
              <div className="ml-1 border-l border-gray-400">
                {Object.keys(features[feature]).map((author: string) => {
                  return (
                    <p
                      className="p-1 text-xs select-none"
                      key={generateRandomString()}
                    >
                      {author}: {features[feature][author]}%
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

export default Statistics
