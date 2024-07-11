import Hero from "../components/Hero"
import Sections from "../components/Sections"
import ViewingButton from "../components/ViewingButton"
import PlayerProfiles from "../components/PlayerProfiles"
import { useLoaderData } from "react-router-dom"

const HomePage = ({}) =>{

  const allplayerprofiles = useLoaderData()
  console.log(allplayerprofiles)

 const engageto = "/players" //Viewing button destination
 
  const numberFilter = (items, key, givenMin=0, givenMax=100) => {
    // console.log(givenMin)
    // console.log(givenMax)
    return items.filter((item) => givenMin <= item[key] && item[key]<= givenMax)
    
  };
  const intersectFilter = (A,B) => A.some((item)=>B.has(item))
  const equalityFilter = (a,b) => a===b
  const booleanFilter = (bool) => bool
  const randomIndex = (n) => Math.floor(Math.random() * n)

  const sortOverall = (items) => items ? items.sort((a,b)=>b.overall - a.overall) : []
  
  const sortAge = (items) => items ? items.sort((a,b)=>a.age - b.age) : []
  
  const filterMap = {
    "overall":numberFilter,
    "age":numberFilter,
    "star":booleanFilter,
  }
  const sortMap = {
    "overall":sortOverall,
    "age":sortAge,
  }

  const allEngagementFilters = [
    {
      name:"Top Talents",
      metrics: {
        filters:[
          {
            metric:"overall",
            min:87,
          }
        ],
        sort:"overall"
      }
    },
    {
      name:"Young Players",
      metrics: {
        filters:[
          {
            metric:"age",
            max:21,
          }
        ],
        sort:"age"
      }
    },
    
  ]

 

  const filteration = (items, filters) =>{
    let filteredItems = [...items]
    filters.forEach((filter) => {
      filteredItems = filterMap[filter.metric](filteredItems, filter.metric, filter.min, filter.max)
      //console.log(filteredItems)
    });
    return filteredItems
  } 
  const sorting = (items, sort) => sortMap[sort](items)
  const engagementPipeline = (initial, filters, sort) => sorting(filteration(initial, filters), sort)
  
  const engagement = allEngagementFilters[randomIndex(allEngagementFilters.length)]
  const engageTitle = engagement.name
  const engageFilters = engagement.metrics.filters
  const engageSort = engagement.metrics.sort
  
  const playerprofiles = engagementPipeline(allplayerprofiles, engageFilters, engageSort)
//  console.log(playerprofiles)
  
  return(
      <>
          <Hero></Hero> 
          <Sections></Sections>
          <PlayerProfiles playerprofiles={playerprofiles} title={engageTitle} isHomePage={true}></PlayerProfiles>
          <ViewingButton to={engageto} category={engageTitle} list={playerprofiles}></ViewingButton>
      </>
  )
}
export default HomePage