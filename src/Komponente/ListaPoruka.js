import React, { Component } from "react";


class ListaPoruka extends Component{

    
    render(){ 
        
        // definiranje vrijednosti stanja poruke, korisnika iz props-a
        const { poruke, korisnik } = this.props;
                    
        return(
            <ul className="spremnikPoruka">
                
                {/* iteracija preko objekata u nizu poruke */}
                {
                    poruke.map((poruka, index) => {

                        const {member, text} = poruka; //Dohvaćanje vrijednosti member objekta i teksta poruke unutar objekta koji servis vraca

                        if (poruka.member.clientData.imeKorisnika=== korisnik.imeKorisnika){
                            // console.log("Korisnik je isti: ", member.clientData.imeKorisnika);

                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={index} className="poruka-align-right poruka" >
                                   
                                    <div className="sadrzaj" >
                                        <h4>{member.clientData.imeKorisnika}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <span className="ikona" style={{backgroundColor: member.clientData.boja}}/>
                                </li>
                            )
                        }
                        
                        else if (member.clientData.imeKorisnika !== korisnik.imeKorisnika){
                            // console.log("Korisnik nije isti: ", member.clientData.imeKorisnika)
                           
                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={index} className="poruka-align-left poruka" >
                                  <span className="ikona" style={{backgroundColor: member.clientData.boja}}/>
                                    <div className="sadrzaj">
                                        <h4>{member.clientData.imeKorisnika}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <span className="ikona" style={{backgroundColor:poruka.boja}}/>
                                    
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }
}

export default ListaPoruka;