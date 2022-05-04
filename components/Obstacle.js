import Matter, { use } from 'matter-js'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import rData from '../json/thankYouGrace.json'

var restaurantID = Math.floor(Math.random() * rData.length) + 1;
const Obstacle = props => {
    useEffect(() => {
        
        restaurantID = Math.floor(Math.random() * rData.length) + 1;
        setRestaurantName(restaurantID);
    }, [])
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    let [restaurantName, setRestaurantName] = useState("");

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    const color = props.color;


    return (
        <View style={{
            borderWidth: 1,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }} >
            <Text style={styles.restaurantLabel}>{restaurantID}</Text>
        </View>
    )
}

export default (world, label, color, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true
        }
    )
    Matter.World.add(world, initialObstacle)

    return {
        body: initialObstacle,
        color,
        pos,
        renderer: <Obstacle />
    }
}
const styles = StyleSheet.create({
    restaurantLabel: {
        transform: [{ rotate: '90deg' }],
        top: 100
    }
})