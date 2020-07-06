import { IBallState } from "./GameStatusState";

export interface IDrawState {
    loading?: boolean;
    ballsNumber?: Array<IBallState>,
    drawNumber?: string,
    drawDate?: Date | null,
    errors?: Array<string>,
    retrievedData?: Array<IDraw>
}

export interface IDraw {
    drawNumber: string,
    numbersDrawn: string[],
    drawId: string,
}

export interface IDrawProps {
    history?: Array<String>;
    classes?: any;
}