import React, { useState } from 'react';

const RandomVerseComp = () => {
const [getVerse, setVerse] = useState(null);
const [userInputVisiblility, setuserInputVisiblility] = useState(false);
const [bookName, setBookName] = useState('');
const [chpNumber, setChpNumber] = useState('');
const [versNumber, setVerseNumber] = useState('');
const [errorMsg, setErrorMsg] = useState('')

// this function fetches a random verse from the bible.org
const getRandomVerseFun = async () => {
    setErrorMsg('')
    try {
          const fetchVerse = await fetch('https://labs.bible.org/api/?passage=random&type=json');       // fetching a random verse
       
          const verse = await fetchVerse.json();
          console.log(verse); // logging to console to verify the incoming data for our reference
          setVerse(verse[0]);   // setting the verse field to display 
        }
        // priting an error message if it failed to get the verse 
    catch (error) {
            console.error("Failed to retrieve Verse. Please try again!", error);
            setErrorMsg('Something went wrong. Please try again!')

        }
};

// this function fetches a specific verse from bible.org
const getSpecificVerse = async (e) => {
    e.preventDefault();
    // intializing all the fields as empty fields
    setErrorMsg('')
    setBookName('')
    setChpNumber('')
    setVerseNumber('')    

    try {
        // we will pass the bookname, chapterNumber and verse Number to the api
          const fetchVerse = await fetch(`https://labs.bible.org/api/?passage=${bookName}%${chpNumber}:${versNumber}&type=json`);
          if(fetchVerse.status===400){
            setErrorMsg("Failed to get Verse. Please check your input and try again!")
            setVerse("")
          }
          const verse = await fetchVerse.json();
          console.log(verse);
          setVerse(verse[0]);
        } 
        // print an error message if it failed to get that verse
    catch (error) {
            console.error("Failed to get Verse. Please try again!", error);
            
            
        }
    };

return (
    <div>
        <h1>Bible Verse</h1>
        <div className='button-container'>
            {/*By default setting the input fields as invisible and only visible when the Get Specific verse is clicked */}
        <button onClick={() => {setuserInputVisiblility(false); getRandomVerseFun();}}>Random Verse</button>
        <button  onClick={() => setuserInputVisiblility(!userInputVisiblility)}> {'Get Specific Verse'} </button>

        </div>
              
        {
            // get specific verse when the getSpecificverse button is clicked
        userInputVisiblility && (
            <form onSubmit={getSpecificVerse}>

                <input type='text' placeholder='Book name' value={bookName} onChange={(e) => setBookName(e.target.value)} required/>

                <input type='number' placeholder='Chapter' value={chpNumber} onChange={(e) => setChpNumber(e.target.value)} required/>
                   
                <input type='number' placeholder='Verse' value={versNumber} onChange={(e) => setVerseNumber(e.target.value)} required/>

                <button type='submit'>Get Verse</button>
            </form>
            )
        }

{
         getVerse && (
            // display a random verse when random verse button is clicked
            <div className='verse'>
                {/* extracting bookname, chapter, verse from returned json output from the api */}
            <strong>{getVerse.bookname}, </strong>
            <strong>{getVerse.chapter}:</strong>
            <strong>{getVerse.verse} </strong>
            <i>{getVerse.text}</i>
            </div>
            )
        }

        {
            // printing error message when error occured
            errorMsg && <div className='errormessage'> {errorMsg} </div>    
        }
    </div>
    );
};

export default RandomVerseComp;
