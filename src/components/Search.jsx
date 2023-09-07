import {React, useState, useEffect} from "react";
import { client } from "../client";
import { searchQuery } from "../Utils/Data";
import MasonryLayout from "./MasonryLayout";


const Search = ({searchTerm}) => {  

  const [pins, setPins] = useState([]);
  
  
  useEffect(() => {
    const query = searchQuery(searchTerm);
    client.fetch(query).then(data => setPins(data))
  }, [searchTerm]);
  

  return <div>
    {
      pins.length !== 0 ?
      <MasonryLayout pins={pins && pins } />:
      <p>No Pins Found :(</p>
    }
  </div>;
};

export default Search;
