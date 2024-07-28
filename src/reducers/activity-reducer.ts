import {Activity} from "../types";


// acciones
export type ActivityActions =
    {type:'save-activity', payload: {newActivity:Activity} } |
    {type: 'set-activeId', payload: {id: Activity['id']}} |
    {type: 'delete-activity', payload: {id: Activity['id']}} |
    {type: 'reset-app'}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

// revisa si hay actividades en el localstorage para asi no limpiarlas si es que hay o llegara a ver
const locaStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: locaStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState =  initialState,
    action: ActivityActions,
    ) => {
    if (action.type === 'save-activity') {
        // manejo de logica para actualizar el state
        console.log('save-activity')
        let updateActivities: Activity[] = [];
        if (state.activeId) {

            updateActivities = state.activities.map(activity => {
                return activity.id === state.activeId ? action.payload.newActivity : activity
            })
        } else {
           updateActivities =  [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updateActivities,
            activeId: ''

        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'reset-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}