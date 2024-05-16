import mongoose from "mongoose";
export interface IauthState {
  token: string | null;
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type IauthAction = LoginSuccessAction | LogoutAction;

export interface Idata {
  name: string,
  email: string,
  password: string,
  cpassword: string

}


export interface Ivehicle {
  _id: mongoose.Schema.Types.ObjectId
  id: number,
  vehicleName: string,
  type: string,
  fuel: string,
  seat: number,
  desc: string,
  price: number,
  startingPrice: number
  images: string
  bookings?:{
    startingDate:Date,
    endingDate:Date
  }
}



export interface IvehicleRes extends Ivehicle {
  isBlocked: boolean
}

export interface Itoken {
  name: string,
  email: string,
  role: string,
  id: string,
  exp: number,
  iat: number
  image: string
}

export interface Iuser {
  _id: any,
  name: string,
  email: string,
  image: string,
}

export interface IuserRes {

  _id: any
  name: string
  email: string
  password: string
  mobile?: string
  secondaryMobile?: string
  age?: string
  otp?: number,
  gender?: string
  language?: string
  profile?: string
  isBlocked: boolean
  address?: Iaddress
  lastseen?:Date
  unRead:number,
  newMessage:number
}

export interface IuserEdit {
  _id: mongoose.Schema.Types.ObjectId | undefined
  name: string
  email: string
  mobile?: string
  secondaryMobile?: string
  age?: string
  gender?: string
  language?: string
}

export interface Iaddress{
  locality:string,
  house:string,
  city:string,
  state:string,
  pincode:string
}


export interface Ipackage {
  title: string,
  car: string,
  days: number,
  total: number,
  perDay: number,
  desc: string,
  image: string
}

export interface IpackageRes {
  _id: any,
  title: string,
  vehicle: Ivehicle,
  days: number,
  location: string,
  perDay: number,
  total: number,
  desc: string,
  image: string,
  isAvailable: boolean
}

export interface IpackageEdit extends Ipackage {
  _id: any
}

export interface IAlertState {
  show: boolean;
  head?: string;
  content?: string;
  color?: string;
}


export interface Idriver {
  name: string
  email:string
  vehicles: string[]
  age: string
  gender: string
  password:string
  exp: string
  driverBata: string
  mobile: string
  image: string
}

export interface IdriverRes {
  _id: any
  driverName: string
  email:string
  vehicles: string[]
  age: string
  gender: string
  password:string
  exp: number
  driverBata: number
  mobile: string
  image: string
  status:string | number
  isAvailable: boolean
}

export interface Ilocation {
  city: string,
  name: string,
  address_line1: string,
  address_line2: string,
  country: string,
  country_code: string
  county: string
  formatted: string
  lat: number
  lon: number
  place_id: string
  postcode: string
  state: string
  state_code: string
}

export interface IbookingAuth {
  from: Ilocation
  to: Ilocation
  period:{
    time:string
    date:Date
  }
  distance: number
  person:{
    adult:number,
    child:number
  },
  returnDate?:Date
  type:string
}

export interface IbookingOver extends IbookingAuth{
driver:any
vehicle:any
totalKm:number
totalPrice:number
}

export interface IpickupRes {
  bookingName: string
  email: string
  mobile: number
  address: string,
  city: string,
  postCode: string,
  state: string
}
export interface IbookingRes extends IbookingOver{
  _id:any,
  driver:IdriverRes,
  vehicle:IvehicleRes
  payment:boolean
  userId:any,
  status:string
  pickupDetails:IpickupRes
}

export interface Ipickup {
  bookingName:string
  email:string,
  mobile:string | undefined,
  address:string,
  state:string,
  city:string,
  postCode:string
}











