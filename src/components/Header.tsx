import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Colors } from "../styles/colors"
import { FontAwesome } from "@expo/vector-icons"

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header({
    children,
    reloadGame,
    isPaused,
    pauseGame
}: HeaderProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={Colors.background} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome name={isPaused ? "play-circle" : "pause-circle"} size={35} color={Colors.background} />
            </TouchableOpacity>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        borderColor: Colors.background,
        borderRadius: 30,
        borderWidth: 12,
        padding: 15,
        backgroundColor: Colors.primary
    }
})