import { useState } from "react";
// import { FormControl, FormLabel, FormText } from "react-bootstrap";
// import { Col, Row, Form } from "react-bootstrap";

function UnosKorisnika(props){

    const {promjenaKorPodataka} = props;
    const [korisnickoIme, setKorisnickoIme] = useState("");
    const [korisnickaBoja, setKorisnickaBoja] = useState("");

    const handleColor = event => {
        setKorisnickaBoja(event.target.value.toString());
    }

    const handleUsername = event => {
        setKorisnickoIme(event.target.value.toString());
        console.log(korisnickoIme)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (korisnickaBoja !== "" && korisnickoIme !== "")
        console.log(korisnickaBoja, korisnickoIme);
        promjenaKorPodataka(korisnickaBoja, korisnickoIme)
        setKorisnickaBoja("");
        setKorisnickoIme("");
    }


    return (
        <div className= "container-korPodaci">
             <form id="unosKorPodataka" onSubmit={handleSubmit}>    
                <input onChange={handleUsername} type="text" value={korisnickoIme} id="korisnickoIme"/>
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