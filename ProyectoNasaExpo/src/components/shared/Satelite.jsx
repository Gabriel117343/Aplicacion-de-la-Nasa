import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const Satelite = () => {

    const moveAnim = useRef(new Animated.Value(-100)).current;
    const verticalAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current; // Nueva referencia para la rotación

    useEffect(() => {
        const moveHorizontal = Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: 400,
                    duration: 20000,
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: -100,
                    duration: 20000,
                    useNativeDriver: true,
                })
            ])
        );

        const moveVertical = Animated.loop(
            Animated.sequence([
                Animated.timing(verticalAnim, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalAnim, {
                    toValue: 50,
                    duration: 5000,
                    useNativeDriver: true,
                }),
            ])
        );

        const rotate = Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 10, // Rotar a 10 grados
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: -30, // Rotar a -10 grados
                    duration: 5000,
                    useNativeDriver: true,
                }),
            ])
        );

        Animated.parallel([moveHorizontal, moveVertical, rotate]).start();
    }, [moveAnim, verticalAnim, rotateAnim]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [-10, 10],
        outputRange: ['-10deg', '30deg'],
    });

    return (
        <Animated.Image
            style={[
                styles.satelite,
                {
                    transform: [
                        { translateX: moveAnim },
                        { translateY: verticalAnim },
                        { rotate: rotateInterpolate }, // Aplicar la rotación
                    ],
                },
            ]}
            source={require('../../../assets/satelite-nasa.png')}
        />
    );
}

const styles = StyleSheet.create({
    satelite: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: '2%',
        left: '5%',
        zIndex: 0,
        opacity: 0.7,
    },
});