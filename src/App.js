import './App.css';

import React, { Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import UnosKorisnika from './Komponente/UnosKorisnika';
import ListaPoruka from './Komponente/ListaPoruka';
import Unos from './Komponente/Unos';

// definicija funkcije za postavljanje nasumicnog izbora korisnickog imena, vrijednosti preuzete sa scaledrone tutorial-a
function imeKorisnika(){
  const pridjevi = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const imenice = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];

  return pridjevi[Math.floor(Math.random() * pridjevi.length)] + imenice[Math.floor(Math.random() * imenice.length)];
}

// definicija funkcije za postavljanje nasumicnog izbora boja
function bojaKorisnika() {
  // var boja = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  // if (boja === "#FFFFFF"){
  //   boja = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  // }

  // var ikona = [<FontAwesomeIcon icon="fa-solid fa-user-astronaut" />]

  var boja = "\\ikone-korisnika\\" + Math.floor(Math.random() * 5).toString() + ".svg"
  if (boja === "0.svg"){
    boja = "\\ikone-korisnika\\1.svg"
  }
  return boja
}

class App extends Component {
  // definicija pocetnog stanja s nizom za nove poruke i informacija o korisniku 
  state = {
    messages: [],
    member: {
      imeKorisnika: imeKorisnika(),
      boja: bojaKorisnika() 
    }

  };


  
  constructor(props) {
    super(props);
    // nova veza sa scaledrone-om, slanje podataka o korisniku
    this.drone = new window.Scaledrone("JXNdHGh1MlDA9xLC", {
      data: this.state.member
    });

    // definiranje radnji kod povezivanja sa scaledrone-om
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      // postavljenje lokalne vrijednosti stanja 
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member}) ;
    });
    
    
    
    
    // definicija sobe(room) unutar scaledrone kanala
    const room = this.drone.subscribe("observable-seminarski");
    // postavljanje vrijednosti korisnika(member) npr. member.id, imeKorisnika itd u niz poruka (message)
    // console.log("Member prije room on: " + JSON.stringify(this.state.member))
    room.on('data', (data, member) => {
      
      const mcopy = this.state.messages;
      // console.log("Member prije pusha: ", member)
      mcopy.push({member, text: data});
      this.setState({mcopy});
      // console.log("Member nakon room on: " + JSON.stringify(mcopy))
    });
  }

    render(){

      return (
        <div className="App">
          {/* helmet postavlja vrijednost za meta podatke ili u header html-a */}
          <HelmetProvider>
            <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              <title>React chat aplikacija, seminarski Antun Horvat</title>
            </Helmet> 
          </HelmetProvider>


         

          { this.state.member.imeKorisnika ? <header className="App-header"> 
            <h1>React aplikacija za razgovor, Antun Horvat</h1>
         </header> : ""}
         
         {/* <UnosKorisnika promjenaKorPodataka = {this.promjenaBojeImena}/> */}

          
          <ListaPoruka korisnik={this.state.member} poruke={this.state.messages}/>
          <Unos saljiPoruku={this.saljiPoruku}/>
          </div>
          )}
    
    saljiPoruku = (message) => { 
      // this.setState({
      //   poruke: [...this.state.poruke, 
      //     {
      //     imeKorisnika: this.state.member.imeKorisnika,
      //     boja: this.state.member.boja,
      //     text: poruka
      //   }]
      // });

      // publish na scaledrone servis bazu podataka
      // console.log("Poruka kod slanja u app komponenti je: " + message);
      this.drone.publish({room:"observable-seminarski", message})
      // console.log(this.state.messages)
      // console.log("korisnik kod slanja: ", this.state.member)
    };

    // promjenaBojeImena = (boja, ime) => {
    //   this.setState({...this.state.member, imeKorisnika:ime, bojaKorisnika:boja})
    //   console.log(this.state.member);
    // }
    
  

 
 
}

export default App;
