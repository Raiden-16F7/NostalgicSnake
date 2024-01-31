import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'



export default function Game(): JSX.Element {
    const handleGesture = (event: any) => {
        const { translationX, translationY } = event.nativeEvent
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                //moving right
            } else {
                //moving left
            }
        } else {
            if (translationY > 0) {
                //moving down
            } else {
                //moving up
            }
        }
    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
            </SafeAreaView>
        </PanGestureHandler>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    }
})