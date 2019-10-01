import React from 'react';
import './InputClient.css';
import db from '../FirestoreConfig'
import { Container, Table, Button, Row, Col, InputGroup, Input, Fade } from 'reactstrap';


class InputClient extends React.Component {

      state = {
        items: [],
        inputValue: '',
        message: '',
        id: '',
        fadeIn: false,    
      };

      componentDidMount() {
        db.collection('Menu').onSnapshot((snapShots) => {
            this.setState({
                items: snapShots.docs.map( doc => {
                return { id:
                  doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error);    
        }   
        )};
      
      changeValue = (e) =>{
          this.setState({
          inputValue: e.target.value
          })
      };
    
      sendName = () => {
        console.log( this.state.inputValue);
        
        const { inputValue } = this.state.inputValue;
          db.collection('Menu').add({
            items: inputValue
         }).then( () => {
           this.message('Enviado');
        }).catch(() => {
            this.message('error'); 
          });
    };
  
    getTodo = (id) => {
      let docRef  = db.collection('Menu').doc(id);
      docRef.get().then((doc) => {
          if (doc.exists) {
              this.setState({
              inputValue: doc.data().item,
              id: doc.id,
              })
          } else {
              console.log('El documento no existe');
              
          }
      }).catch((error) => {
          console.log(error);
      })
      };

      message = (message) => {
        this.setState({
            inputValue:'',
            message: message
        })
        setTimeout(() => {
            this.setState({
            message: ''
            })
        }, 2000)
        };
           

    render() {
    const { inputValue } =  this.state;
      return (
            <form>
               <h4 className="title-name">NOMBRE DE CLIENTE</h4>
               <Row className='name-container'>
                  <Col xs='10' className='input-placeholder'>
                     <input  placeholder = "Ingrese nombre del cliente" type="text" value= { inputValue } onChange={ this.changeValue } />
                  </Col>
                  <Col xs='2'>
                     <button className='save-name' type="submit" value="Submit" onClick={ this.sendName }> GUARDAR </button>
                  </Col>

               </Row>
            </form>
      );
    }
  }

  export default InputClient;