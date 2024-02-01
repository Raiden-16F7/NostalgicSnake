import { Coordinate } from "../types/types";

export const checkEatsFood = (
    head: Coordinate,
    food: Coordinate,
    area: number
): boolean => {
    const distancebetweenFoodandSnakeX: number = Math.abs(head.x-food.x)
    const distancebetweenFoodandSnakeY: number = Math.abs(head.y - food.y)
    return (
        distancebetweenFoodandSnakeX < area && distancebetweenFoodandSnakeY < area
    )
}