import { Fragment } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";

interface SnakeProps {
    snake: Coordinate[]
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
    return (
        <Fragment>
            {snake.map((segement: Coordinate, index: number) => {
                const SegementStyle = {
                    left: segement.x * 10,
                    top: segement.y * 10
                }
                return <View key={index} style={[styles.snake, SegementStyle]} />
            })}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        position: 'absolute',
        borderRadius: 14,
        backgroundColor: Colors.background
    }

})