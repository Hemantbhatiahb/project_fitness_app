const rapidApiKey =process.env.REACT_APP_RAPID_API_KEY

export const exerciseOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': rapidApiKey,
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': rapidApiKey,
		'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
	}
};

export const fetchData = async (url,options)=>{
    const response  =  await fetch(url,options);
    if(!response.ok) {
        throw new Error(JSON.stringify({message:'Could not fetch exercises'}, {status:500}))
    }
    const responseData =  response.json();
    return responseData ;
}


export const scrollHandler =(event)=>{
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }