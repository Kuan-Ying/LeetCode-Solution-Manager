const idCompare = (a,b, reverse) => {
  return (reverse)? b.id - a.id: a.id - b.id
}

const titleCompare = (a, b, reverse) => {
  return (reverse)? b.title.localeCompare(a.title): a.title.localeCompare(b.title) 
}

const acCompare = (a, b, reverse) => {
  return (reverse)? (b.acRate - a.acRate): (a.acRate - b.acRate) 
}

const difficulty = (obj) => {
  switch (obj.difficulty[0]) {
    case 'E':
      return 0
    case 'M':
      return 1
    default:
      return 2
  }
}

const diffCompare = (a, b, reverse) => {
  return (reverse)? difficulty(b) - difficulty(a): difficulty(a) - difficulty(b) 
}

const likesCompare = (a, b, reverse) => {
  return (reverse)? a.likes - b.likes: b.likes - a.likes
}

const dislikesCompare = (a, b, reverse) => {
  return (reverse)? a.dislikes - b.dislikes: b.dislikes - a.dislikes
}

export const ID = 0
export const TITLE = 1
export const AC_RATE = 2
export const DIFFICULTY = 3
export const LIKES = 4
export const DISLIKES = 5

export default function propertySort(problems, pos, reverse) {
  switch (pos) {
    case ID:
      return  problems.sort((a, b) => idCompare(a, b, reverse))
    case TITLE:
      return  problems.sort((a, b) => titleCompare(a, b, reverse))
    
    case AC_RATE:
      return  problems.sort((a, b) => acCompare(a, b, reverse))

    case DIFFICULTY:
      return  problems.sort((a, b) => 
        (diffCompare(a, b, reverse))? 
          diffCompare(a, b, reverse): (acCompare(a, b, !reverse))
      )
    case LIKES:
      return  problems.sort((a, b) => 
        (likesCompare(a, b, reverse))? 
          likesCompare(a, b, reverse): (acCompare(a, b, !reverse))
      )
    case DISLIKES:
      return  problems.sort((a, b) => 
          (dislikesCompare(a, b, reverse))? 
            dislikesCompare(a, b, reverse): (acCompare(a, b, !reverse))
      )
    default:
      return problems
  }
}


