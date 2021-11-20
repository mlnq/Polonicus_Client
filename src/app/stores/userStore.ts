import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import UserCreds from "../models/userCreds";
import User from "../models/user";
import { store } from "./store";
import { history } from "../..";
import UserRegister from "../models/userRegister";

export default class UserStore{

    user: User | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    get isLogged()
    {
        return !!this.user;
    }

    login = async (userCreds: UserCreds) =>{

        try{
            const user = await agent.Account.login(userCreds);
            store.utilsStore.setToken(user.token);

            runInAction(() =>
            {
                this.user=user;
                this.user.dateOfBirth = new Date(user.dateOfBirth!);
            });


            history.push('/outposts');
            console.log(user);
        }
        catch(e){
            console.log(e);
        }
    }

    logout = () => {
        store.utilsStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/');
     }

     register = async(user:UserRegister) =>{
        console.log('rejestruje Usera w BD');
        try{
            await agent.Account.register(user);
            //dodac info ze zarejestrowano pomyslnie
            history.push('/');
        }
        catch(e){
            console.log(e);
        }
     }

     getUser = async() =>{
        try{
            console.log('szukam Usera na podstawie CLAIMA');

            let user = await agent.Account.getUser();

            runInAction(() =>
            {
                this.user=user;
                console.log(user.dateOfBirth);
                this.user.dateOfBirth = new Date(user.dateOfBirth!);
            });

            console.log(user);
        }
        catch(e){
            console.log(e);
        }
     }



     getAge =() =>{
         var today = new Date();
         var birthday =this.user!.dateOfBirth;
          var age = today.getFullYear() - birthday!.getFullYear();
          var age = today.getFullYear() - birthday!.getFullYear();
         var m = today.getMonth() - birthday!.getMonth();

         if (m < 0 || (m === 0 && today.getDate() < birthday!.getDate())) 
         {
            age--;
         }
        return age;

     }
};