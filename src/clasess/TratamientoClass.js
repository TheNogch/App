import { firebaseApp } from '../utils/firebase';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default class TratamientoClass{
    constructor(titulo, descripcion, tipo, fechaInicio, frecuencia, intervalo, fechaFin){
            this._titulo = titulo;
            this._descripcion = descripcion;
            this._tipo = tipo;
            this._fechaInicio = fechaInicio;
            this._frecuencia = frecuencia;
            this._intervalo = intervalo;
            this._fechaFin = fechaFin;
    }

    get titulo(){
        return this._titulo;
    }

    set titulo(titulo){
        this._titulo = titulo
    }

    get descripcion(){
        return this._descripcion;
    }
    
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }

    get tipo(){
        return this._tipo;
    }

    set tipo(tipo){
        this._tipo = tipo;
    }

    get fechaInicio(){
        return this._fechaInicio;
    }

    set fechaInicio(fechaInicio){
        this._fechaInicio = fechaInicio;
    }

    get intervalo(){
        return this._intervalo;
    }

    set intervalo(intervalo){
        this._intervalo = intervalo;
    }

    get frecuencia(){
        return this._frecuencia;
    }

    set frecuencia(frecuencia){
        this._frecuencia = frecuencia;
    }

    get fechaFin(){
        return this._fechaFin;
    }

    set fechaFin(fechaFin){
        this._fechaFin = fechaFin;
    }

    infoTratamiento(){
        console.log(this);
    }

    objetoTratamiento(){
        return ({
            titulo: this.titulo,
            descripcion: this.descripcion,
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin,
            intervalo: this.intervalo,
            frecuencia: this.frecuencia,
            tipo: this.tipo
        });
    }

    agregarTratamiento(idPaciente){
        db.collection("pacientes").doc(idPaciente).collection("Tratamientos").add(this.objetoTratamiento())
        .then(function(docRef){
            console.log("Documento añadido correctamento con ID: ", docRef.id);
        })
        .catch(function(error){
            console.log("Error al agregar el documento:", error);
            throw error;
        });
    }

    static obtenerListaTratamientos(idPaciente){
        return new Promise((resolve) => {
            db.collection("pacientes").doc(idPaciente).collection("Tratamientos").get()
            .then(function(querySnapshot) {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                resolve(data)
            })
        })

    }

    static obtenerListaMedicamentos(){
        console.log("Lista Medicamentos");
    }

    static obtenerListaActividades(){
        console.log("Lista Actividades");
    }

    static crearTratamiento(){
        return new Tratamiento("Tratamiento nuevo", "Tines que hacer X e Y durante Z dias");
    }
}
