import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
  VrButton
} from 'react-vr';
import * as Products from './mock_data/products.json';
import Product from './components/product';

class CartVR extends React.Component {
  constructor(props){
    super();
    this.state = { rotation: 0, crotation: 0, text: 'Batteries AA' };
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  rotate(){
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    let caro = this.state.crotation;

    if(this._moveLeft){
       caro = this.state.crotation + delta / 30;
    } else if(this._moveRight){
       caro = this.state.crotation - delta / 30
    }

    this.setState({rotation: this.state.rotation + delta / 60, crotation: caro });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }
  
  componentDidMount(){
    this.rotate();
  }

  componentWillUnmount(){
    if(this.frameHandle){
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  _navLeftButtonSelected(event){

    this._moveLeft = this._moveLeft ? false : true;
  }

  _navRightButtonSelected(event){
  
    this._moveRight = this._moveRight ? false : true;
  }
  
  render() {

    let coordinates = [
      { x: 0, y: 0, z: -3, rotateY: 0 },
      { x: 2, y: 0, z: -2, rotateY: -45 },
      { x: 3, y: 0, z: 0, rotateY: -90 },
      { x: 2, y: 0, z: 2, rotateY: -135 },
      { x: 0, y: 0, z: 3, rotateY: 180 },
      { x: -2, y: 0, z: 2, rotateY: 135 },
      { x: -3, y: 0, z: 0, rotateY: 90 },
      { x: -2, y: 0, z: -2, rotateY: 45 }
    ];

    let productData = Products.products.map((product, index) => {
        return (<Product key={index} 
        x={coordinates[index].x} y={coordinates[index].y} z={coordinates[index].z} rotateY={coordinates[index].rotateY}
        rotation={this.state.rotation} name={product.name} obj={asset(product.mesh.obj)} mtl={asset(product.mesh.mtl)} />);
    });

    return (
      <View>
        <Pano source={asset('bowmore-011-panorama-of-the-city-center.jpg')} />
     
            <View>
              
                <Image ref="test" onEnter={this._navLeftButtonSelected.bind(this)} onExit={this._navLeftButtonSelected.bind(this)} source={asset('left_arrow.png')} style={{ layoutOrigin: [0.5, 0.5], position: 'absolute', height: 1, width: 1, transform: [ {translate: [-2, 0, -3]} ]}} />
              
   
                <Image onEnter={this._navRightButtonSelected.bind(this)} onExit={this._navRightButtonSelected.bind(this)} source={asset('right-arrow.png')} style={{ layoutOrigin: [0.5, 0.5], position: 'absolute', height: 1, width: 1, transform: [ {translate: [2, 0, -3]} ]}} />
         
            </View>

       
        <View style={{ position: 'absolute', transform: [ {rotateY: this.state.crotation }, { translate: [0, 0, 0] }]}}>
          {productData}
        </View>    
      </View>
    );
  }
};

AppRegistry.registerComponent('CartVR', () => CartVR);
