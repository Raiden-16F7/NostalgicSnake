import { Coordinate } from "../types/types";

export const checkGameOver = (snakeHead: Coordinate, boundaries: any): boolean => {
    return (
        snakeHead.x > boundaries.xMax ||
        snakeHead.x < boundaries.xMin ||
        snakeHead.y > boundaries.yMax ||
        snakeHead.y < boundaries.yMin
    )
}