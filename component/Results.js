import React from 'react'
import {battle} from '../utils/api'
import  {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import {Link} from 'react-router-dom'

function  ProfileList ({profile}){
    return(

      <ul className='card-list'>
        <li>
          <FaUser color='rgb(124, 67, 89)' size={22}/>
          {profile.name}

        </li>
         {profile.location && (
          <li>
            <Tooltip text="user's location">
               <FaCompass color='rgb(90, 34, 20)' size={22}/>
               {profile.location}
            </Tooltip>
          </li>
       )}
       {profile.company && (
          <li>
          <Tooltip text="user's company">
              <FaBriefcase color='#666666' size={22}/>
              {profile.company}
           </Tooltip>
         </li>
       )}
        <li>
         <FaUsers color='rgb(123, 32, 88)' size={22}/>
         {profile.followers.toLocaleString()}.followers
        </li>
        <li>
          <FaUserFriends color='rgb(0, 32, 88)' size={22}/>
          {profile.following.toLocaleString()}.following
         </li>
        </ul>
    )
  }

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
}
export default class Results extends React.Component{
  state = {
       Winner: null,
       loser: null,
       error: null,
       loading: true
     }


  componentDidMount (){

    const {playerOne, playerTwo} = queryString.parse(this.props.location.search)

     battle([playerOne, playerTwo])
      .then((players) => {
        console.log(players);
        this.setState({
          winner: players[0],
          loser:players[1],
          error:null,
          loading:false
        })
      }).catch((message) =>{
        this.setState({
          error:message,
          loading:false
        })
      })
  }
  render() {
   const {winner, loser, error, loading} = this.state

   if (loading === true){

     return <Loading  text='Battle..' />
   }
   if (error){
     return (
       <p className='center-text error'>{error}</p>
     )
   }
   console.log(winner);
    return(
      <React.Fragment>
      <div className='grid space-around container-sm'>
         <Card
           header={winner.score === loser.score ? 'Tie' :'Winner' }
           subheader={`score: ${winner.score.toLocaleString()}`}
           avatar={winner.profile.avatar_url}
           href={winner.profile.html_url}
           name={winner.profile.login}
         >
            <ProfileList profile={winner.profile}/>
          </Card>


          <Card
            header={winner.score === loser.score ? 'Tie' :'Loser'}
            subheader={`score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
         >
            <ProfileList profile={loser.profile}/>
          </Card>
      </div>
      <Link
          to='/battle'
          className='btn dark-btn btn-space'>
          Reset
      </Link>
    </React.Fragment>
    )
  }
}
