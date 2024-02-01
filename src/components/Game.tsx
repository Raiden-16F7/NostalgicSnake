import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import Food from './Food'
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'
import Header from './Header'

const SNAKE_INTIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INTIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 69 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10



export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right)
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INTIAL_POSITION)
    const [food, setFood] = useState<Coordinate>(FOOD_INTIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

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

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake])
            setScore(score + SCORE_INCREMENT)
        } else {
            setSnake([newHead, ...snake.slice(0, -1)])
        }
    }

    const reloadGame = () => {
        setScore(0);
        setSnake(SNAKE_INTIAL_POSITION);
        setFood(FOOD_INTIAL_POSITION);
        setIsGameOver(false);
        setDirection(Direction.Right);
        setIsGamePaused(false);
    }

    const pauseGame = () => {
        setIsGamePaused(!isGamePaused)
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
                <Header isPaused={isGamePaused} pauseGame={pauseGame} reloadGame={reloadGame} >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: 'white'
                    }}>{score}</Text>
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
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
        borderRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30

    }
})