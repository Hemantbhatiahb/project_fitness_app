const rapidApiKey =process.env.REACT_APP_RAPID_API_KEY

export const exerciseOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': rapidApiKey,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

export const fetchData = async (url,options)=>{
    const response  =  await fetch(url,options);
    if(!response.ok) {
        throw new Error('Could not fetch data!')
    }
    const responseData =  response.json();
    return responseData ;
}