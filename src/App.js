import './App.css';

import React, { Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import UnosKorisnika from './Komponente/UnosKorisnika';
import ListaPoruka from './Komponente/ListaPoruka';
import Unos from './Komponente/Unos';

// definicija funkcije za postavljanje nasumicnog izbora korisnickog imena, vrijednosti imena preuzete sa scaledrone tutorial-a
function imeKorisnika(){
  const pridjevi = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  
  const imenice = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];

  return pridjevi[Math.floor(Math.random() * pridjevi.length)] + imenice[Math.floor(Math.random() * imenice.length)];
}

// definicija funkcije za postavljanje nasumicnog izbora ikone korisnika
function ikonaKorisnika() {
 
  var ikone = ["\\ikone-korisnika\\1.svg","\\ikone-korisnika\\2.svg", "\\ikone-korisnika\\3.svg", "\\ikone-korisnika\\4.svg", "\\ikone-korisnika\\5.svg"];
  var ikona = ikone[Math.floor(Math.random() * 5)];
  return ikona;
}

class App extends Component {
  // definicija pocetnog stanja s nizom za nove poruke i informacija o korisniku 
  state = {
    messages: [],
    member: {
      imeKorisnika: imeKorisnika(),
      ikona: ikonaKorisnika() 
    }

  };

  pozivScaledrone(){
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
    room.on('data', (data, member) => {
      
      const mcopy = this.state.messages;
      mcopy.push({member, text: data});
      this.setState({mcopy});
    });
  }

  componentDidMount(){
    this.pozivScaledrone();
  }

    render(){

      return (
        <div className="App">
          {/* helmet postavlja vrijednost za meta podatke ili u header html-a i favicon preuzet s font awesome free resursa */}
          <HelmetProvider>
            <Helmet>
              <title>React chat aplikacija, seminarski</title>
              <link rel="icon" href="/ikone-korisnika/poruka-favicon-fontawesome.svg" sizes="any" type="image/svg+xml"/>
            </Helmet> 
          </HelmetProvider>


         

          <header className="App-header"> 
            <h1>React aplikacija za razgovor, seminarski Antun Horvat</h1>
         </header> 
         
          {/* komponente sučelja */}
          <ListaPoruka korisnik={this.state.member} poruke={this.state.messages}/>
          <Unos saljiPoruku={this.saljiPoruku}/>
          </div>
          )}
    
    saljiPoruku = (message) => { 
   
     // publish na scaledrone servis bazu podataka
      this.drone.publish(
        {
          room:"observable-seminarski", 
          message
      }
      )
    };
 
}

export default App;
