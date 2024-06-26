import {categories} from "../data/data.ts";
import {useState} from "react";
import {Activity} from "../types";

const Form = () => {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setActivity({
            ...activity,
            [e.target.id]: e.target.value
        })
    }
    return (
        <form className={"space-y-5 bg-white shadow p-10 rounded-lg"}>
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
                   className={"bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"}
                    value="Guardar comida o Guardar ejercicio"
            />
        </form>
    );
};

export default Form;