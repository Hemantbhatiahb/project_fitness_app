const rapidApiKey =process.env.REACT_APP_RAPID_API_KEY

export const exerciseOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': rapidApiKey,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': rapidApiKey,
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
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


export const scrollHandler =(event)=>{
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }