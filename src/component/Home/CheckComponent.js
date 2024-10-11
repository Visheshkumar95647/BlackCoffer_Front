import React, { createContext,useContext,useState } from 'react'
import ProfileContext from './ProfileContext';
//if Checking component is false than we have to render the profile section else we render the respective page
const checkingComponent = createContext();
export  function CheckComponent({children}) {
  const {prodata} = useContext(ProfileContext);
    const [checkHome , setCheckHome] = useState(true);
    const [checkSearch , setCheckSearch] = useState(false);
    const [checkProfile , setCheckProfile] = useState(false);
    const [checkPost , setCheckPost] = useState(false);
    const [usernameData , setUsernameData] = useState(prodata);
  return (
    <checkingComponent.Provider value={{ checkHome , setCheckHome , usernameData , setUsernameData , checkSearch , setCheckSearch , checkProfile , setCheckProfile , checkPost , setCheckPost}}>
            {children}
        </checkingComponent.Provider>
  )
}
export default checkingComponent;
