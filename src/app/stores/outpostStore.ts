import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Outpost } from "../models/outpost";

export default class OutpostStore{

    outposts: Outpost[] = [];
    selectedOutpost: Outpost | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    loadOutposts = async () =>{
        this.setLoadingInitial(true);
        try{
            const outpostsLoad = await agent.Outposts.list();
            outpostsLoad.forEach(outpost => 
                this.outposts.push(outpost)
            );
            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }

    selectOutpost = (id: number) =>
    {
        this.selectedOutpost = this.outposts.find(o => o.id === id);
    }
    
    cancelSelectedOutpost = () =>{
        this.selectedOutpost = undefined;
    }

    formOpen = (id?: number) =>
    {
        id ? this.selectOutpost(id) : this.cancelSelectedOutpost();
        this.editMode = true;
    }

    formClose = () => {
        this.editMode = false;
    }

    createOutpost = async (outpost: Outpost) =>{
        this.loading =true;
        try{
            //@TODO PROBLEM Z OSTATNIM IDEKSEM PRZED ZALADOWANIEM ew. przerobić na UUID z id z backendu (przerobic backend na przyjmowanie string id)
            // this.outposts=[];
            await agent.Outposts.create(outpost);
            runInAction(() => {
                outpost.id=
                this.outposts.push(outpost);
                this.selectedOutpost = outpost;
                this.editMode=false;
                this.loading=false;
                // this.loadOutposts();
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
                this.outposts= [...this.outposts.filter(x => x.id !== outpost.id),outpost];
                this.selectedOutpost=outpost;
                this.editMode=false;
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
                this.outposts= [...this.outposts.filter(x => x.id !== id)];
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