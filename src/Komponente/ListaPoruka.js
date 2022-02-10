import React, { Component } from "react";
var randomstring = require("random-string-gen");

class ListaPoruka extends Component{

    static messagesEnd = React.createRef()

    scrollToBottom = () => {
        if (this.messagesEnd !== ""  && this.messagesEnd !== undefined){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
            	
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
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
                            // console.log("Korisnik je isti: ", member.clientData.imeKorisnika);

                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={randomstring(6)}  className="poruka-align-right poruka">
                                   
                                    <div className="sadrzaj" >
                                        <h4>{member.clientData.imeKorisnika}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <span className="ikona">
                                        <img src={member.clientData.boja} alt="user-icon"/>
                                    </span>
                                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                                </li>
                                
                            )
                        }
                        
                        else {
                            // console.log("Korisnik nije isti: ", member.clientData.imeKorisnika)
                           
                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={randomstring(6)} className="poruka-align-left poruka" >
                                  <span className="ikona">
                                        <img src={member.clientData.boja} alt="user-icon" />
                                    </span>
                                    <div className="sadrzaj">
                                        <h4>{member.clientData.imeKorisnika}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <div ref={(el) => { this.messagesEnd = el; }}></div>
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