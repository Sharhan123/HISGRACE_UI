import { ChangeEvent, useRef, useState } from 'react';
import { call } from '../../services/autoComplete';
import { Ilocation } from '../../interfaces';
interface props {
    open:boolean
    close:()=>void
    selectedFrom:(data:Ilocation)=>void
    selectedTo:(data:Ilocation)=>void
    type:string
}
const LocationInfo: React.FC<props> = ({open,close,selectedFrom,selectedTo, type}) => {
   const [datas,setDatas] = useState<any[]>([])
   const [search,setSearch] = useState('')
  const hanldeSearch = async (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value
    setSearch(value)
    try{
        const res = await call(value)
        console.log(res);
        const arr = res?.data.features.filter((item:any)=>item.properties.country_code
 === 'in')
        setDatas(arr)
    }catch(er){
        console.log(er);
        
    }
}

const handleSet = (data:any)=>{
  const res:Ilocation = {
    name:data.properties.name,
    city:data.properties.city,
    country:data.properties.country,
    county:data.properties.county,
    lat:data.properties.lat,
    lon:data.properties.lon,
    address_line1:data.properties.address_line1,
    address_line2:data.properties.address_line2,
    formatted:data.properties.formatted,
    country_code:data.properties.country_code,
    postcode:data.properties.postcode,
    state:data.properties.state,
    state_code:data.properties.state_code,
    place_id:data.properties.place_id
  }
if(type  === 'from'){  
  selectedFrom(res)
}else{
  selectedTo(res)
}
}
  return (
    
    <div className={`fixed  inset-0 ${open?'flex':'hidden'} justify-center items-center bg-gray-800 bg-opacity-50 z-50`}>
    <div className='bg-white rounded-lg p-4 w-full max-w-md'>
    <h1 className='text-center kanit-regular'>Select your location</h1>
      <div className='mt-5 flex items-center  justify-between mb-4'>
        
      <div className="relative flex items-center mt-4 md:mt-0">
      
                <div className="relative w-full min-w-[320px] h-10">
                            <input onChange={hanldeSearch} value={search} className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 " placeholder="" />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-custom peer-focus:text-custom before:border-custom ">FROM</label>
                        </div>
                        </div>
                        <button onClick={()=>{setDatas([])
                          close()
                          setSearch('')
                          }} className='bg-red-500 px-5 py-2 rounded-md text-white kanit-regular'>close</button>
      </div>

      
      <ul className='overflow-auto max-h-96 '>
        {datas && datas[0] && datas.map((result, index) => (
          <li key={index} className='flex justify-between cursor-pointer py-1 px-3 hover:bg-gray-200' onClick={() => {
              handleSet(result)
            setDatas([])
            setSearch('')
            close()
            
          }}>
            <div>

            <p className='text-lg kanit-regular '><span className='bg-slate-700 text-white kanit-regular px-1'>{result.properties.state_code}</span> {result.properties.name?result.properties.name:result.properties.city
}</p>
            <span className='text-sm kanit-regular'>{result.properties.formatted.toString().length <60?result.properties.formatted:result.properties.formatted.length.toString().slice(0,60)}...</span> 
            </div>
            <div>
            
                <p className='uppercase kanit-regular '>{result.properties.country}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
     
  );
};

export default LocationInfo;
