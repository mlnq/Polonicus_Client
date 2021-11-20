import { makeAutoObservable ,runInAction} from "mobx";
import agent from "../api/agent";
import Chronicle from "../models/chronicle";

export default class ChronicleStore{

    chronicleRegistry = new Map<number,Chronicle>();
    selectedChronicle: Chronicle | undefined = undefined;
    loading = false;
    loadingInitial = true;
    selectedOutpostId:number = 0;
    allChronicles= false;

    constructor(){
        makeAutoObservable(this);
    }

    get chronicles() {
        return Array.from(this.chronicleRegistry.values()); 
    }

    setLoadingInitial = (state:boolean) => {
        this.loadingInitial=state;
    }

    setSelectedOutpostId(outpostId:number){
        this.selectedOutpostId=outpostId;
    }

    checkOutpostId(outpostId:number){
        let chronicles = Array.from(this.chronicleRegistry.values());
        if(chronicles.filter(o => o.outpostId !== outpostId))
        return false;        
    }

    clearChronicle=()=>{
        this.chronicleRegistry.clear();
    }

    loadChronicle = async (outpostId:number,id:number) => {
        let chronicle = this.chronicleRegistry.get(id);
        
        // console.log(`Taki obiekt w promise istnieje id:${id}, outpostId: ${chronicle!.name}`);
        //EDIT zwaraca dane  do forma
        if(chronicle && outpostId==this.selectedOutpostId){
            console.log('laduje no')
            this.selectedChronicle = chronicle;
            return chronicle;
        }
        else {
            this.loadingInitial = true;
            try{
                this.setSelectedOutpostId(outpostId);
                console.log("KRAWCZYK KRÓL:"+chronicle);
                chronicle = await agent.Chronicles.details(id,outpostId);
                console.log("KRAWCZYK KRÓL:"+chronicle);
                
                //chronicle.publicationDate = chronicle.publicationDate.split('T')[0];

                chronicle.publicationDate = new Date(chronicle.publicationDate!);
                this.chronicleRegistry.set(chronicle.id,chronicle);

                this.selectedChronicle = chronicle;
                this.setLoadingInitial(false);
                return chronicle;
            }
            catch(e)
            {
                console.log(e);
                this.setLoadingInitial(false);
            }
        }

    }
    getAllChronicles = async () =>{
        this.loadingInitial = true;
        try{
            const chronicleLoad = await agent.Chronicles.getAll();
            chronicleLoad.forEach(chronicle => {
                this.setChronicle(chronicle);
            }
            );
            
            runInAction(()=>this.allChronicles=true) ;
            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadChronicles = async (outpostId:number) =>{
        this.loadingInitial = true;
        ///yyy sprawdzenie id 1 elementu.. ale jakies dziwne bardzo xd
        if(! this.checkOutpostId(outpostId)) this.chronicleRegistry.clear();
        try{
            const chronicleLoad = await agent.Chronicles.list(outpostId);
            chronicleLoad.forEach(chronicle =>
                {
                    this.setChronicle(chronicle);
                }
                );
            runInAction(()=>this.allChronicles=false) ;

            this.setSelectedOutpostId(outpostId)
            this.setLoadingInitial(false);

        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setChronicle =(chronicle:Chronicle)=>{
      //chronicle.publicationDate = chronicle.publicationDate.split('T')[0];
      chronicle.publicationDate = new Date(chronicle.publicationDate!)
      this.chronicleRegistry.set(chronicle.id,chronicle)
    }


    deleteChronicle = async (id: number,outpostId:number)=>{
        this.loading=true;
        try{
             await agent.Chronicles.delete(outpostId, id);
             runInAction(()=>{
                this.chronicleRegistry.delete(id);
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

    updateChronicle = async(chronicle: Chronicle,outpostId:number, id:number)=>{
         this.loading=true;
        try{
            await agent.Chronicles.update(chronicle,outpostId,id);
            runInAction(()=>{
                this.chronicleRegistry.set(chronicle.id,chronicle);
                this.selectedChronicle=chronicle;
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
    };
    createChronicle = async (chronicle: Chronicle,outpostId:number)=>{
        this.loading =true;
        try{
            //@TODO PROBLEM Z OSTATNIM IDEKSEM PRZED ZALADOWANIEM ew. przerobić na UUID z id z backendu (przerobic backend na przyjmowanie string id)
            var response = await agent.Chronicles.create(chronicle,outpostId);

            runInAction(() => {
                chronicle.id = response.id;
                this.selectedChronicle= chronicle;
                this.chronicleRegistry.set(chronicle.id,chronicle);
                this.setChronicle(chronicle);
                this.loading=false;
            });
        }
        catch(e){
            runInAction(() => {
                this.loading=false;
            });
            
        }

    }
    
}