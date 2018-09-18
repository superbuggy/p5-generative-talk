const questions = require('./questions')
const rawData = require('./dev-to-web-survey')

const processedResponses = processResponses(rawData)

export default processedResponses

function emptyHistogram () {
  return questions.reduce(
    (plot, question) => {
      plot[question] = []
      return plot
    },
    {}
  )
}

function counter (array) {
  return array.reduce(
    (histogram, item) => {
      histogram[item] = histogram[item] + 1 || 1
      return histogram
    },
    {}
  )
}

function processResponses (surveyResponses) {
  const collectedResults = surveyResponses.reduce(
    (histogram, response) => {
      Object.keys(response).forEach(question => {
        histogram[question].push(response[question])
      })
      return histogram
    },
    emptyHistogram()
  )

  const processedResults = Object.keys(collectedResults).reduce(
    (countedResults, question) => {
      const responses = collectedResults[question]
      countedResults[question] = counter(responses)
      return countedResults
    },
    emptyHistogram()
  )

  return processedResults
}
