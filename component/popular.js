import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import{FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'


function LanguagesNav({selected, onupdateLanguage}) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python']
   return (
     <ul className ='flex-center'>
      {languages.map((language) =>(
       <li key={language}>
       <button
          className='btn-clear nav-link'
          style={language === selected ? {color: 'rgb(180, 30, 40)'} :null}
          onClick={() => onupdateLanguage(language)}>
          {language}
       </button>
       </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected:propTypes.string.isRequired,
  onupdateLanguage:propTypes.func.isRequired
}

function ReposGrid ({repos}) {
  return (
    <ul className='grid space-background'>
       {repos.map((repo, index) => {
         const{name, owner, html_url, stargazers_count, forks, open_issues } = repo
         const {login, avatar_url} = owner

         return (

           <li key={html_url} >
             <Card
               header={`#{index + 1}`}
                avatar={avatar_url}
                href={html_url}
                name={login}
            >
               <ul className='card-list'>
                 <li>
                   <Tooltip text="Github user">
                     <FaUser color='rgb(124, 67, 89)' size={22}/>
                     <a href={`https//:github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
                 </li>

                  <li>
                    <FaStar color='rgb(90, 34, 20)' size={22}/>
                    {stargazers_count.toLocaleString()} star
                  </li>
                  <li>
                    <FaCodeBranch color='#666666' size={22}/>
                    {forks.toLocaleString()} forks
                  </li>
                <li>
                  <FaExclamationTriangle color='rgb(123, 32, 88)' size={22}/>
                  {open_issues.toLocaleString()} open
                </li>
               </ul>
             </Card>

           </li>
         )

      })}


    </ul>
  )
}
ReposGrid.propTypes={
  repos: propTypes.array.isRequired
}

export default class Popular extends  React.Component{
  state = {
   selectedLanguage: 'All',
   repos: {},
   error: null,
  }
  ComponentDidMount(){
    this.updateLanguage(this.state.selectedLanguage)
  }
 updateLanguage = (selectedLanguage) => {
    this.setState({
        selectedLanguage,
        error: null,
        })

   if (!this.state.repos[selectedLanguage]) {
       fetchPopularRepos(selectedLanguage)
         .then((data) => {
           this.setState(({ repos }) => ({
            repos:{
            ...repos,
            [selectedLanguage]:data
               }
    }))
   })
     .catch(() => {
      console.warn('Error fetching repos:', error)
      this.setState({
      error: 'There was an error fetching repositories.'
           })
           })
         }
      }

     isLoadig = () => {
       const {selectedLanguage, repos, error} = this.state
       return !repos[selectedLanguage] && error === null

     }
  render() {
    console.log(this.state)
  const {selectedLanguage, repos, error} = this.state

  return(
    <React.Fragment>
    <LanguagesNav
     selected={selectedLanguage}
     onupdateLanguage={this.updateLanguage}
     />
     {this.isLoadig() && <Loading text='fectingRepos'/>}
     {error && <p className='center-text error'>{error}</p>}
     {repos[selectedLanguage] &&<ReposGrid repos ={repos[selectedLanguage]} />}
    </React.Fragment>

  )

  }

}