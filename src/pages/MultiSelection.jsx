import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from "react"
import { classNames } from "../utils/Utils"

export const MultiSelection = ({data, selectedData = [], onSelected}) => {

    const [selected, setSelected] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        let items = {};
        selectedData.forEach(e => {
            items[e.id] = true;
        });
    }, [selectedData])

    const selectItem = (item) => {
        // setSelected({...selected, [item.id]: !selected[item.id] ?? true});
        let items = selectedData;
        if(items.length === 0) {
            items.push(item);
        } else {
            const exists = items.filter(e => e.id === item.id).length > 0;
            if(exists) {
                items = items.filter(e => e.id !== item.id);
            } else {
                items.push(item);
            }
        }
        onSelected(items);
        // setSelectedItems(items);
    }

    return(
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {data.map((e) =>
                <button
                    key={e.id}
                    type="button"
                    className={classNames(selectedData.find(f => e.id === f.id)?.id ? 'border border-indigo-500' : '',"rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50")}
                    onClick={() => selectItem(e)}
                >
                    <span className="flex items-center">
                        {selectedData.find(f => e.id === f.id)?.id ? <CheckCircleIcon className="w-8 h-8 mr-5 text-indigo-500 shrink-0" /> : <PlusCircleIcon className="w-8 h-8 mr-5 shrink-0 text-gray-500" />}
                        <span className={classNames(selectedData.find(f => e.id === f.id)?.id ? "text-indigo-500" : "text-gray-500")}>{e.name}</span>
                    </span>
                </button>
            )}
        </div>
    )
}