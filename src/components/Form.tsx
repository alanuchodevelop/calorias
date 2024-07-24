import {categories} from "../data/data.ts";
import {Dispatch, FormEvent, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {Activity} from "../types";
import {ActivityActions, ActivityState} from "../reducers/activity-reducer.ts";

type FormProps = {
    // children: React.ReactNode
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const INITIAL_STATE: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

const Form = ({dispatch, state} : FormProps) => {

    const [activity, setActivity] = useState<Activity>(INITIAL_STATE)

    useEffect(() => {
        if (state.activeId) {
            console.log(state.activeId)

            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value // el signo ´+ convierte a numero la cadena y gracias a eso pues se puede convertir
        })
    }

    // valida lo que se ingresa en el input
    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: "save-activity",
            payload: {newActivity: activity}
        })

        setActivity({
            ...INITIAL_STATE,
            id: uuidv4()
        })
    }

    return (
        <form className={"space-y-5 bg-white shadow p-10 rounded-lg"} onSubmit={handleSubmit}>
            <p>formulario</p>
            <div className={"grid grid-cols-1 gap-3"}>
                <label htmlFor="category">Categoria:</label>
                <select className={"border border-slate-300 p-2 rounded-lg w-full bg-white"}
                        name=""
                        value={activity.category}
                        onChange={handleChange}
                        id="category">
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={"grid grid-cols-1 gap-3"}>
                <label htmlFor="name" className={"font-bold"}>Actividad:</label>
                <input id="name"
                       type="text"
                       className={"border border-slate-300 p-2 rounded-lg"}
                       placeholder="Ej. Comida, ensalada, Jugo de naranja, Ejercicio, Pesas"
                        value={activity.name}
                       onChange={handleChange}

                />
            </div>
            <div className={"grid grid-cols-1 gap-3"}>
                <label htmlFor="calories" className={"font-bold"}>Calorias:</label>
                <input id="calories"
                       type="number"
                       className={"border border-slate-300 p-2 rounded-lg"}
                       value={activity.calories}
                       placeholder="Calorias. ej. 300 500"
                       onChange={handleChange}

                />
            </div>
            <input type="submit"
                   className={"bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"}
                   value={activity.category === 1 ? "Guardar comida" : "Guadar ejercicio" }
                   disabled={!isValidActivity()}
            />
        </form>
    );
};

export default Form;