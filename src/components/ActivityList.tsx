import {Activity} from "../types";
import {useMemo, Dispatch} from "react";
import {categories} from "../data/data.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {ActivityActions} from "../reducers/activity-reducer.ts";
import {XCircleIcon} from "@heroicons/react/16/solid";

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

function ActivityList({activities, dispatch}: ActivityListProps) {

    const categoryName = useMemo(() => (category: Activity['category']) =>
            categories.map((categoryItem) => categoryItem.id === category ? categoryItem.name : '')
        , [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
    console.log("actividades",isEmptyActivities)
    return (
        <>
            <h2 className={"text-4xl font-bold text-slate-600 text-center"}>Comida y actividades</h2>
            { isEmptyActivities ? <p className={"text-center"}>No hay actividades aun...</p> :

                activities.map((activity) => (
                    <div key={activity.id} className={"px-5 py-10 bg-white mt-5 flex justify-between shadow"}>
                        <div className={"space-y-2 relative"}>

                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-full
                        ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(activity.category)}
                            </p>
                            <p className={"font-bold text-2xl pt-5"}>Nombre: <span
                                className={"font-normal"}>{activity.name}</span></p>
                            <p className={"font-black text-4xl text-lime-500"}>
                                {activity.calories} {' '}
                                <span>
                                Calorias
                            </span>
                            </p>
                        </div>

                        <div className={"flex gap-5 items-center"}>
                            <button
                                onClick={() => dispatch({type: "set-activeId", payload: {id: activity.id}})}
                            >
                                <PencilSquareIcon
                                    className={"h-8 w-8 text-gray-800"}

                                />
                            </button>

                            <button
                                onClick={() => dispatch({type: "delete-activity", payload: {id: activity.id}})}
                            >
                                <XCircleIcon
                                    className={"h-8 w-8 text-red-800"}
                                />
                            </button>

                        </div>
                    </div>
                ))
            }
        </>

    );
}

export default ActivityList;