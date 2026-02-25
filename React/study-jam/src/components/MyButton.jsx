import { useState } from "react";

function MyButton({ name, age, label }) {
  const [names, setNames] = useState("");
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{name}</h1>
      <h1>{count}</h1>
      <button 
        className="bg-blue-500 w-64 h-64"
        onClick={() => setCount((count) => count + 1)}>{label}
      </button>

      {
        count > 5
        ? (
          <h1>More than 5</h1>
        )
        : (
          <h1>Less than 5</h1>
        )
      }
      
      {/* <div className="bg-red-700 w-20 h-20 p-2 m-auto text-center text-xl font-bold">
        myDiv1
      </div>
      <div className="bg-blue-700 w-20 h-20 p-2 m-auto text-center">
        myDiv2
      </div> */}

      {/* <div className="border-2 border-red-300 p-4 grid grid-cols-3 gap-4 md:bg-green-300 sm:bg-yellow-300 lg:bg-blue-300">
        <div className="bg-red-500 w-50 h-50">div 1</div>
        <div className="bg-blue-500 w-50 h-50">div 2</div>
        <div className="bg-yellow-500 w-50 h-50">div 3</div>
        <div className="bg-red-200 w-50 h-50">div 1</div>
        <div className="bg-blue-200 w-50 h-50">div 2</div>
        <div className="bg-yellow-200 w-50 h-50">div 3</div>
      </div> */}
    </>
  )
}

export default MyButton;