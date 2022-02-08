import { useState } from "react";
import { FormControl, FormLabel, FormText } from "react-bootstrap";
import { Col, Row, Form } from "react-bootstrap";

function UnosKorisnika(props){

    const [korisnickoIme, setKorisnickoIme] = useState("");
    const [korisnickaBoja, setKorisnickaBoja] = useState("");

    const handleColor = event => {
        setKorisnickaBoja(event.target.value);
    }

    const handleUsername = event => {
        setKorisnickoIme(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(korisnickaBoja, korisnickoIme);
    }
    return (
        <div className= "container-korPodaci">
             <form id="unosKorPodataka" onSubmit={handleSubmit}>    
                <input onChange={handleUsername} type="text" id="korisnickoIme"/>
                <br/>
                <br/>
                <input onChange={handleColor} type="color" id="korisnickaBoja"/>
                <br/>
                <br/>
                <button type="submit">Nastavi</button>
            </form>
        </div>
    )

      

        
            
        

        
}

export default UnosKorisnika;