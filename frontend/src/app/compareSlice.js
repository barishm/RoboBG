import { createSlice } from "@reduxjs/toolkit"

const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        robots:[]
    },
    reducers: {
        addRobot: (state, action) => {
            return {
                ...state,
                robots: [...state.robots, action.payload]
            };
        },
        deleteRobotById: (state, action) => {
            const idToDelete = action.payload;
            state.robots = state.robots.filter(robot => robot.id !== idToDelete);
        },
        deleteAllRobots: (state) => {
            state.robots = [];
        },
        compareTwoRobots: (state, action) => {
            state.robots = action.payload;
        },
    }
})
export const { addRobot, deleteRobotById,deleteAllRobots,compareTwoRobots } = compareSlice.actions
export default compareSlice.reducer