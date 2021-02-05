const API_KEY = "key_cur_prod_DataTraffic";

const requests = {
    saveLocationsFromApi: `/get_locations_for_api?api_key=${API_KEY}`,
    saveCharactersFromApi: `/get_characters_for_api?api_key=${API_KEY}`,
    clearDataFromApi: `/clear_register?api_key=${API_KEY}`,
    dashboard: `/dashboard?api_key=${API_KEY}`,
    getCharacters: `/characters?api_key=${API_KEY}`,
    getLocations: `/locations?api_key=${API_KEY}`,
    getEpisodes: `/episodes?api_key=${API_KEY}`,
    addEpisode: `/episode?api_key=${API_KEY}`,
    getCharacter(id){
      return `/character/${id}?api_key=${API_KEY}`
    },
    getLocation(id){
      return `/location/${id}?api_key=${API_KEY}`
    },
    getEpisode(id){
      return `/episode/${id}?api_key=${API_KEY}`
    },
    editEpisode(id){
      return `/episode/${id}?api_key=${API_KEY}`
    },
    deleteEpisode(id){
      return `/episode/${id}?api_key=${API_KEY}`
    }
}
export default requests;
