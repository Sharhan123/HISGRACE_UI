import React from 'react'
import VehiclesDetails from '../customUI/VehiclesDetails'
import {  IpackageRes } from '../../interfaces'
import { PackageCardPlaceholder } from '../customUI/placeholders'
interface props{
packages:IpackageRes[]
loading:boolean
}

const PackagesCard:React.FC<props>  = ({packages,loading})=> {
  return (
    <div className="container-fluid  mx-auto py-4 px-6 flex   justify-center">
      <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-4 ">
      {loading ? (
                        // Placeholder or loading indicator while fetching data
                        Array.from({ length: 2 }).map((_, index) => (
                            <PackageCardPlaceholder key={index} />
                        ))
                    ) : (
                      packages && packages.length > 0 ? (
                        packages.map((vehicle, index) => (
                          <VehiclesDetails key={index} vehicle={vehicle} />
                        ))
                    ):(
                      <h1>No vehicles</h1>
                    )
                  )
                  }
                        
                  
        
      </div>
    </div>
  )
}

export default PackagesCard
