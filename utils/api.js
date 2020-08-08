const id = "bf1da4ddc81902b6bfa0"
const sec = "088441ec47035ebdc993e59c31435e84d4ecc15f"
const params = `?client_id=${id}&client_secrect=${sec}`

function getErrorMsg(message,username){
  if(message === 'Not Found'){
  return `${username} doesn't exit`
}
return message
}

function getProfile(username){
  console.log(username);
    return fetch(`https://api.github.com/users/${username}${params}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors'
}).then(res =>res.json()).then(data => {
             console.log("-----indie--");
              if (data.message){
                throw new Error(getErrorMsg(profile.message, username))
             }
             console.log(data)
             return data
  })
}

function getRepos(username){
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
          .then((res) => res.json())
          .then((repos) => {
            if (repos.message){
              throw new Error(getErrorMsg(repos.message, username))
            }
            return repos
    })
}

function getStarCount(repos){

  return repos.reduce((count,{stargazers_count}) => count + stargazers_count, 0)

}


function calculateScore(followers,repos){
  return (followers * 3) + getStarCount(repos)
}

function getUserData(player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) =>({
     profile,
     score: calculateScore(profile.followers, repos)
   }))

}

function sortPlayers(players){

  return players.sort((a,b)=> b.score - a.score)

}

export function battle(players){
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then((results) => sortPlayers(results))
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars>1&language-${language}&sort=stars&order=desc&type=Repositories`)

   return fetch(endpoint)
     .then((res) => res.json())
     .then((data) => {
       console.log(data)
        if (!data.items) {
          throw new Error(data.message)
      }
      return data.items
    })

  }
