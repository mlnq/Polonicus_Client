import { createContext, useContext } from "react";
import OutpostStore from "./outpostStore";


interface Store{
    outpostStore: OutpostStore,
}

export const store: Store = {
    outpostStore: new OutpostStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}