import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'

const SNAKE_INTIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INTIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 71 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10



export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right)
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INTIAL_POSITION)
    const [food, setFood] = useState<Coordinate>(FOOD_INTIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isGamePaused, setIsGamePaused] = useState<boolean>(false);

    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isGamePaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId)
        }
    }, [snake, isGameOver, isGamePaused])

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead } // making a copy of snake Head

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev)
            return;
        }

        //gameover
        switch (direction) {
            case Direction.Up:
                newHead.y -= 1
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1
                break;
            case Direction.Right:
                newHead.x += 1
                break;
            default:
                break;
        }
        setSnake([newHead, ...snake.slice(0, -1)])
    }

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