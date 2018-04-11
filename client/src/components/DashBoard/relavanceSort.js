const tagFilter = (problem, filters) => {
  let match = [...filters.entries()].reduce(
      (total, [key, value], index) =>  {
        if (!Array.isArray(value)) return total && value == problem[key]
        if (!Array.isArray(problem[key])) { //title case.
          return total && ([...value].some(
            v => problem[key].toLowerCase().includes(v.toLowerCase())
          ))  
        }
        return total // tag case, to be updated.
      }, true)
  return match
}

export default function relevanceSort(problems, filters){
  problems = problems.filter(problem => tagFilter(problem, filters))
  const keywords = ([...filters.entries()]).filter(([key, value]) => value.length > 1)
  if (keywords.length === 0 || (keywords.length === 1 && keywords[0][0] == 'difficulty')) return problems

  return problems.map(problem => {
    const relavanceReducer = (total, [key, value]) => {
      const singleKeyReducer = (total, v) => {
        if (!Array.isArray(problem[key])) { //title case.
          let words = problem[key].toString().toLowerCase().split(" ")
          let score = words.reduce((count, word) => count + (word.includes(v.toLowerCase())? 1: 0) , 0)
          return total + score
        }
        return total // tag case, to be updated.
      }
      return total + [...value].reduce(singleKeyReducer, 0)
    }
    return {...problem, relavance:keywords.reduce(relavanceReducer, 0)}
  }).sort((a, b) => b.relavance - a.relavance)
}