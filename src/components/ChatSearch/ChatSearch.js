import React from 'react';  
import styles from "./ChatSearch.module.css"

const Search = ({ searchTerm, setSearchTerm }) => {  
  return (  
    <input 
    className={styles.searchInput}  
      type="text"   
      placeholder="Search chats..."   
      value={searchTerm}  
      onChange={(e) => setSearchTerm(e.target.value)}   
    />  
  );  
};  

export default Search;