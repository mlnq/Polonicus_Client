import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Outpost } from "../models/outpost";

export default class OutpostStore{

    outpostRegistry = new Map<number,Outpost>();
    selectedOutpost: Outpost | undefined = undefined;
    loading = false;
    loadingInitial: Boolean|undefined = undefined;

    constructor(){
        makeAutoObservable(this);
    }

    get outposts() {
        return Array.from(this.outpostRegistry.values());
    }

    loadOutposts = async () =>{
        this.loadingInitial = true;
        try{
            const outpostsLoad = await agent.Outposts.list();
            outpostsLoad.forEach(outpost => 
                this.outpostRegistry.set(outpost.id,outpost)
            );
            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadOutpost = async (id:number) => {
        let outpost = this.outpostRegistry.get(id);
        //EDIT zwaraca dane  do forma
        if(outpost){
            console.log(`Taki obiekt w promise istnieje id:${id}, outpost.name: ${outpost.name}`);
            outpost.id=id;
            this.selectedOutpost = outpost;
            return outpost;
        }
        else {
            this.loadingInitial = true;
            try{
                outpost = await agent.Outposts.details(id);
                this.outpostRegistry.set(outpost.id,outpost);
                this.selectedOutpost = outpost;
                this.setLoadingInitial(false);
                return outpost;
            }
            catch(e)
            {
                console.log(e);
                this.setLoadingInitial(false);
            }
        }

    }


    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }
    

    createOutpost = async (outpost: Outpost) =>{
        this.loading =true;
        try{
            const response = await agent.Outposts.create(outpost);
            runInAction(() => {
                outpost.id = response.id;
                this.outpostRegistry.set(response.id,outpost);
                this.selectedOutpost = outpost;
                this.loading=false;
            });
        }
        catch(e){
            runInAction(() => {
                this.loading=false;
            });
            
        }
    }



    updateOutpost = async(outpost: Outpost) =>{

        this.loading=true;
        try{
            await agent.Outposts.update(outpost);
            runInAction(()=>{
                this.outpostRegistry.set(outpost.id,outpost);
                this.selectedOutpost=outpost;
                // this.editMode=false;
                this.loading=false;
            });
        }
        catch(e)
        {
            console.log(e);
            runInAction(() => {
                this.loading=false;
            });
        }
    }

    deleteOutpost = async(id: number)=>{
        this.loading=true;
        try{
             await agent.Outposts.delete(id);
             runInAction(()=>{
                this.outpostRegistry.delete(id);
                this.loading=false;
            });
        }
        catch(e)
        {
            console.log(e);
            runInAction(() => {
                this.loading=false;
            });
        }
    }
}