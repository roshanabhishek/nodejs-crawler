import { googleSearchRESTURL } from "../config/config.js"

// Default set page_size to 5
export const getGoogleApiSearchResult = async (searchQuery, pageSize = 5) => {
    const url = `${googleSearchRESTURL}&q=${searchQuery}&num=${pageSize}`;
    try{
        const response = await fetch(url, { cache: 'no-cache' })
        if(response.ok){
          const jsonResponse = await response.json()
          return jsonResponse;
        }
      }
    catch(error){
      console.error(error)
      return error;
    }
}