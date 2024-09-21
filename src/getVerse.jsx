import React, { useState } from 'react';

const RandomVerseComp = () => {
const [getVerse, setVerse] = useState(null);
const [userInputVisiblility, setuserInputVisiblility] = useState(false);
const [bookName, setBookName] = useState('');
const [chpNumber, setChpNumber] = useState('');
const [versNumber, setVerseNumber] = useState('');
const [errorMsg, setErrorMsg] = useState('')

const getRandomVerseFun = async () => {
    setErrorMsg('')
    try {
          const fetchVerse = await fetch('https://labs.bible.org/api/?passage=random&type=json');
       
          const verse = await fetchVerse.json();
          console.log(verse);
          setVerse(verse[0]);
        }
    catch (error) {
            console.error("Failed to get Verse. Please try again!", error);
            setErrorMsg('Something went wrong. Please try again!')

        }
};

const getSpecificVerse = async (e) => {
    e.preventDefault();
    setErrorMsg('')
    setBookName('')
    setChpNumber('')
    setVerseNumber('')    

    try {
          const fetchVerse = await fetch(`https://labs.bible.org/api/?passage=${bookName}%${chpNumber}:${versNumber}&type=json`);
          if(fetchVerse.status===400){
            setErrorMsg("Failed to get Verse. Please check your input and try again!")
            setVerse("")
          }
          const verse = await fetchVerse.json();
          console.log(verse);
          setVerse(verse[0]);
        } 
    catch (error) {
            console.error("Failed to get Verse. Please try again!", error);
            
            
        }
    };

return (
    <div>
        <div className='button-container'>
        <button onClick={() => {setuserInputVisiblility(false); getRandomVerseFun();}}>Random Verse</button>
        <button  onClick={() => setuserInputVisiblility(!userInputVisiblility)}> {'Get Specific Verse'} </button>

        </div>
              
        {
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
            <div className='verse'>
            <strong>{getVerse.bookname}, </strong>
            <strong>{getVerse.chapter}:</strong>
            <strong>{getVerse.verse} </strong>
            <i>{getVerse.text}</i>
            </div>
            )
        }

        {
            errorMsg && <div className='errormessage'> {errorMsg} </div>    
        }
    </div>
    );
};

export default RandomVerseComp;
