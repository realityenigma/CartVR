import React from 'react';
import {
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
  Mesh
} from 'react-vr';
import * as Categories from '../categories.json';

class Categories extends React.Component {
    
    static defaultProps = {

    }
    
    constructor(){
        super();
    }

    render(){

        let categories = Categories.categories.map((category, index) => {
            return (
                <Text key={index} style={{backgrounColor: 'black'}}>
                    {category.name}
                </Text>
            );
        });

        return (
            {categories}
        );
    }
}

export default Categories;