import './App.css'
import Autocomplete from './Components/Autocomplete';

function App() {

  // const staticData =[
  //   "apple",
  //   "banana",
  //   "berries",
  //   "orange",
  //   "grape",
  //   "mango",
  //   "melon",
  //   "berrl",
  //   "Peach",
  //   "Cherry",
  //   "Plum"
  // ];

  const fetchSuggestions = async(query) => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const result = await response.json();
      return result.recipes;
    } catch(e) {
      throw new Error("Network response was not ok");
    }
  }

  return (
    <>
      <Autocomplete 
        placeholder={"Enter Recipe"} 
        // staticData={staticData} 
        fetchSuggestions={fetchSuggestions} 
        dataKey={"name"} 
        customLoading={<>Loading Recipes..</>} 
        onSelect={(res) => console.log(res)} 
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}} />
    </>
  )
}

export default App
