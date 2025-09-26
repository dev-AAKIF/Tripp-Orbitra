import React from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="bg-[linear-gradient(to_right,_#093028,_#6CC686)] h-auto">
      
      <nav className="bg-transparent text-white h-10 w-20 flex justify-center items-center"> <div className="text-2xl font-bold font-grandstander justify-center items-center text-center">Tripp</div> </nav>

      <div className="p-6">
        <Card />
      </div>
    </div>
  );
}

export default App;
