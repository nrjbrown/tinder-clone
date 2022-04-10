import React, {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css'; 
import axios from './axios.js';




function TinderCards() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

//this connects the front & backend 

    useEffect(()=>{
        
        async function fetchData() {
            setLoading(true);
            const req = await axios.get('/tinder/cards');
            setPeople(req.data)
            setLoading(false);
            
        }
        fetchData(); 
    }, []);

    console.log(people)

    const [direction, setLastDirection] = useState('');

    const swiped =(direction, nameToDelete) => {
        console.log("removing" + nameToDelete);
        // setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    }
    
    return (
        <div className="tinderCards">
        
        
            <div 
            className="tinderCards__cardContainer">

            {loading && (<img
              className="h-80 w-80 object-contain"
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt=""
            />)}

            
            {people.map((person)=>(
            
                
                <TinderCard
                
                className="swipe"
                key={person.name}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, person.name)}
                onCardLeftScreen= {()=> outOfFrame(person.name)}
                >
                    <div 
                
                    style={{ backgroundImage: `url(${person.imgUrl})`}}
                    className="card">
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
            )
               
            )}
            
            </div>

           
        </div>
    );
}

export default TinderCards
