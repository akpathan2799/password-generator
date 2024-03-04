import { useCallback, useEffect, useState,useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length , setLength] = useState(7);
  const [numbers , setNumbers] = useState(false);
  const [characters,setCharacters] = useState(false);

  const passwordReference = useRef(null);
  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numbers){str = str + '0123456789'}
    if(characters){str = str + '~!@#$%^&*()_+'}

    for(let i = 0 ; i < length ; i++){
      let randomIndex = Math.floor(Math.random() * str.length);
      generatedPassword = generatedPassword + str[randomIndex];
    }

    setPassword(generatedPassword);
  

  },[length,numbers,characters,setPassword])
  useEffect(()=>{passwordGenerator()},[length,numbers,characters])

  const copyToClipBoard = useCallback(() =>{
    passwordReference.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div className=" w-full h-screen bg-slate-950">
      <h1 className="text-3xl font-extrabold text-slate-200 text-center py-7">
        Password Generator
      </h1>

      <div className="w-[40%] px-2 py-5 bg-gray-700 mx-auto rounded-md ">
        <div className="w-full flex gap-2">
          <input
            type="text"
            className="w-[100%] rounded-md placeholder-blue-400 py-2 px-2 text-sky-600 outline-none text-2xl"
            value={password}
            ref={passwordReference}
            placeholder="Password...."
            readOnly
          ></input>
          <button className="bg-sky-500 hover:bg-sky-700 active:bg-sky-800 px-4 py-2 rounded-md text-white" onClick={copyToClipBoard}>
            Copy
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-4 my-4 py-2 j">
          <div className="flex items-center gap-2">
            <input type="range" min="5" max="60" value={length} id="slider" onChange={(e) => setLength(e.target.value)}></input>
            <label className="text-white font-bold ">Length : {length}</label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" onChange={()=>setNumbers((prev)=> !prev)}></input>
            <label className="text-white font-bold">Numbers</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" onChange={()=>setCharacters((prev)=> !prev)}></input>
            <label className="text-white font-bold">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
