import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM} from '../types';


const initialState = {
    scream: {},
    screams: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
            }
        // case SET_SCREAM:
        //     return {
        //         ...state,
        //         scream: action.payload
        //     };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state,
                screams: [
                    ...state.screams
                ]
            }
        case DELETE_SCREAM:
            const screamIdToBeDeleteed = action.payload;
            let indexOfScream = state.screams.findIndex(scream => scream.Id === screamIdToBeDeleteed);
            state.screams.splice(indexOfScream, 1);
            return {
                    ...state,
                    screams: [
                        ...state.screams
                    ]
            }
        case POST_SCREAM:
            state.screams.push(action.payload)
            return {
                    ...state,
                    screams: [
                        ...state.screams
                    ]
                }
        default:
            return state
    }
}