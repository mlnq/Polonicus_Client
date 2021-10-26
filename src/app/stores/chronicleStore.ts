import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import Chronicle from "../models/chronicle";

export default class ChronicleStore{

    chronicleRegistry = new Map<number,Chronicle>();
    selectedChronicle: Chronicle | undefined = undefined;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this);
    }

    get chronicles() {
        return Array.from(this.chronicleRegistry.values()); 
    }

    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }

    checkOutpostId(outpostId:number){
        let chronicles = Array.from(this.chronicleRegistry.values());
        if(chronicles.filter(o => o.outpostId === outpostId))
        return true;        
    }

    deleteChronicle(outpostId:number,id:number){

    }

    loadChronicles = async (outpostId:number) =>{
        this.loadingInitial = true;
        if(! this.checkOutpostId(outpostId)) this.chronicleRegistry.clear();
        try{
            const chronicleLoad = await agent.Chronicles.list(outpostId);
            chronicleLoad.forEach(chronicle =>
                {
                    this.setChronicle(chronicle);
                }
                );
            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setChronicle =(chronicle:Chronicle)=>{
       chronicle.publicationDate = chronicle.publicationDate.split('T')[0];
       this.chronicleRegistry.set(chronicle.id,chronicle)
    }

    
}