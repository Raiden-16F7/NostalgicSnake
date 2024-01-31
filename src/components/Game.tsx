import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'

const SNAKE_INTIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INTIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = [{ xMin: 0, xMax: 35, yMin: 0, yMax: 63 }]
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10



export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right)
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INTIAL_POSITION)
    const [food, setFood] = useState<Coordinate>(FOOD_INTIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isGamePaused, setIsGamePaused] = useState<boolean>(false);

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                //moving right
                setDirection(Direction.Right)
            } else {
                //moving left
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                //moving down
                setDirection(Direction.Down)
            } else {
                //moving up
                setDirection(Direction.Up)
            }
        }
    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.background,
        borderWidth: 12,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30

    }
})