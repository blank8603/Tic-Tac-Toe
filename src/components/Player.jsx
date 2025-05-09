import { useState } from "react";

export default function Player({intialname,symbol ,isactive , onChangeName}){

    const [playername,setplayername] = useState(intialname);
    const [isEditing,setIsEditing] = useState(false)
    
    function handleChange(event){
        setplayername(event.target.value)
        
    }

    function handleClick(){
        setIsEditing(editing =>(!editing))
        btncaption = 'Save';
        if(isEditing){
            onChangeName(symbol,playername);x
        } 
        
    }
    let editableplayername = <span className="player-name">{playername}</span>
    let btncaption = "Edit";


    if(isEditing){
        editableplayername = <input type="text" required value={playername} onChange={handleChange}/>;
        
    }
    return <li className={isactive?"active":undefined}>
    <span className="player">
        {editableplayername}
        <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleClick}>{(isEditing?"save":"Edit")}</button>
    </li>;
}


// import { useState } from "react";

// export default function Player({ intialname, symbol, isactive, setplayername }) {
//   const [isEditing, setIsEditing] = useState(false);

//   function handleChange(event) {
//     setplayername(event.target.value); // Update the parent state
//   }

//   function handleClick() {
//     setIsEditing((editing) => !editing);
//   }

//   let editableplayername = <span className="player-name">{intialname}</span>;
//   if (isEditing) {
//     editableplayername = (
//       <input
//         type="text"
//         required
//         value={intialname}
//         onChange={handleChange}
//       />
//     );
//   }

//   return (
//     <li className={isactive ? "active" : undefined}>
//       <span className="player">
//         {editableplayername}
//         <span className="player-symbol">{symbol}</span>
//       </span>
//       <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
//     </li>
//   );
// }
