import React, { Component } from "react";
var randomstring = require("random-string-gen");

class ListaPoruka extends Component{

    // pohrana funkcije za izradu reference do koje će se focus pomaknuti na zadnji element u listi poruka
    static messagesEnd = React.createRef()

    //  definicija funkcije za pomak fokusa/scroll do određenog elementa 
    scrollToBottom = () => {
        if (this.messagesEnd !== ""  && this.messagesEnd !== undefined){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }      	
      }
      
    //  scroll do zadnjeg elementa nakon mounta ove komponente(lista poruka)
      componentDidMount() {
        this.scrollToBottom();
      }
      
    //   scroll nakon azuriranja tj. primanja/slanja nove poruke
      componentDidUpdate() {
        this.scrollToBottom();
      }

    render(){ 
        
        // definiranje vrijednosti stanja poruke, korisnika iz props-a
        const { poruke, korisnik } = this.props;

        return(
            <ul className="spremnikPoruka">
                
                {/* iteracija preko objekata u nizu poruke */}
                {

                    poruke.map((poruka, index) => {

                        const {member, text} = poruka; //Dohvaćanje vrijednosti member objekta i teksta poruke unutar objekta koji servis vraca

                        if (member.clientData.imeKorisnika === korisnik.imeKorisnika){

                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={randomstring(6)}  className="poruka-align-right poruka">
                                   
                                    <div className="sadrzaj" >
                                        <h4>{member.clientData.imeKorisnika}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <span className="ikona">
                                        <img src={member.clientData.ikona} alt="user-icon"/>
                                    </span>
                                     <div ref={(el) => { this.messagesEnd = el; }}></div>    {/* prazni spremnik do kojega se scroll pomice nakon primanja/slanja poruke */}
                                </li>
                                
                            )
                        }
                        
                        else {
                           
                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={randomstring(6)} className="poruka-align-left poruka" >
                                  <span className="ikona">
                                        <img src={member.clientData.ikona} alt="user-icon" />
                                    </span>
                                    <div className="sadrzaj">
                                        <h4>{member.clientData.imeKorisnika}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <div ref={(el) => { this.messagesEnd = el; }}></div>    {/* prazni spremnik do kojega se scroll pomice nakon primanja/slanja poruke */}
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