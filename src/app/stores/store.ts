import { createContext, useContext } from "react";
import ChronicleStore from "./chronicleStore";
import OutpostStore from "./outpostStore";


interface Store{
    outpostStore: OutpostStore,
    chronicleStore: ChronicleStore,
}

export const store: Store = {
    outpostStore: new OutpostStore(),
    chronicleStore: new ChronicleStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}