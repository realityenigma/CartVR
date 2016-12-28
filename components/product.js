import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
  Mesh
} from 'react-vr';

class Product extends React.Component {

    constructor(props){
        super();
    }

    render(){
        return (
            <View style={
                {
                    position: 'absolute', 
                    padding: 0.45, 
                    transform: [
                        {
                            translate:[this.props.x, this.props.y, this.props.z]
                        }, 
                        {rotateY: parseFloat(this.props.rotateY)}
                    ], 
                    layoutOrigin: [0.5, 0.5]}
                }>
                <Mesh source={{mesh: this.props.obj, mtl: this.props.mtl}} style={{transform: [ {scale: 0.03}, { rotateY: this.props.rotation } ]}} />
                <Text style={
                    {
                        textAlign: 'center', 
                        textAlignVertical: 'bottom',
                    
                    }}
                    fontSize={0.5}>{this.props.name}</Text>
            </View>
        )
    }
}

export default Product;