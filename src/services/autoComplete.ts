import axios from "axios";


export const call = async (value: string) => {
    var config = {
        method: 'get',
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=9eb4e72be82b436faf6ab7bdbf1b1afc&country:IN`,
        headers: {}
    };


    try {
        const response = await axios(config)
        return response
    } catch (err) {
        console.log(err);

    }

}

export const matrix = async (from:{lon:number| undefined,lat:number| undefined},to:{lon:number|undefined,lat:number|undefined}) => {
   
    var data = JSON.stringify(
        {
            "mode": "drive",
            "sources": [
                { "location": [ 
                    from.lon, from.lat 
                ] }
            ],
            "targets": [
                {
                    "location": [to.lon,to.lat ]
                },
            ]
        }
    );

    var config = {
        method: 'post',
        url: 'https://api.geoapify.com/v1/routematrix?apiKey=9eb4e72be82b436faf6ab7bdbf1b1afc',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response = await axios(config)
return response.data.sources_to_targets 

}