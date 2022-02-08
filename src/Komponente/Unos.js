import { useState } from "react";

function Unos (props){
    // postavljanje stanja za poruke i definiranje funkcije za slanje poruke iz props-a
    const { saljiPoruku } = props;
    const [ tekstPoruke, setTekstPoruke ] = useState("");

    // funkcija za spremanje vrijednosti polja za unos poruke
    const unosTeksta = e =>{
        setTekstPoruke(e.target.value.toString());
        // console.log(tekstPoruke);
    }

    // funkcija za slanje poruke i postavljanje stanja s vrijednosti poruke na prazno
    const posaljiPoruku = e => {
        e.preventDefault();
        if (tekstPoruke.toString().trim() !== "")
            {
                // console.log(tekstPoruke);
                saljiPoruku(tekstPoruke);
                setTekstPoruke("");
            }   
    }

    return (
        <form className="form-Input" onSubmit={posaljiPoruku}>
            <input onChange={unosTeksta} value={tekstPoruke} autoFocus={true} type="text" maxLength={190} placeholder="Unesite poruku i pritisnite Enter/Pošalji..." />
            <button>POŠALJI</button>
        </form>
        )   
}

export default Unos;