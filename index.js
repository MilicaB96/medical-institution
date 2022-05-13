import {labType} from "./lab.js"
function testTypeError(type){
    if(type != "blood sugar level" && type != "blood pressure" && type != "cholesterol level"){
        throw new Error("That type of testing is not available at this lab")
    }
}
class Doctor{
    labForPatient= [];
    constructor(name,surname,specialty){
        this.name = name;
        this.surname = surname;
        this.specialty = specialty;
    }
    makeLabAppointment(patient,date,time,type){
        if(patient.doctor != this){
            throw new Error("You are not assigned to this patient");
        }
        testTypeError(type);
        console.log(`${patient.name} ${patient.surname} JMBG:${patient.jmbg} fileNo:${patient.fileNum}
        Lab appointment for ${type} \n Time: ${date} ${time}`)
        this.labForPatient.push({"type":type, "date":date,"time":time, "patient":patient} )
    }
}
class Patient{
    doctor = ""
    constructor(name,surname,jmbg,fileNum){
        this.name = name;
        this.surname = surname;
        this.jmbg = jmbg;
        this.fileNum = fileNum;
    }
    assignDoctor(doctor){
        this.doctor = doctor; 
    }
    doLabWork(type,date,time){
        let tests = [];
        let results = [];
        const labId = this.doctor.labForPatient.findIndex((lab) =>  lab.type == type && lab.patient.jmbg == this.jmbg );
        if(labId === -1){
            throw new Error("I'm sorry you don't have an appointment")
        }

        if(this.doctor.labForPatient[labId].time !=time || this.doctor.labForPatient[labId].date != date){
            console.log("Your lab appointment is not scheduled at this time")
            return;
        }
        switch(type){
            case "blood pressure":
                tests = labType["blood pressure"];
            break;
            case "blood sugar level":
                tests = labType["blood sugar level"];
            break;
            case "cholesterol levels":
                tests = labType["cholesterol levels"];
                break;
        }
        if(type == "blood pressure"){
        tests.forEach((test) => results.push(`${test}:${Math.round(Math.random()*100)}`))
        }
        else{
            results = [`value: ${Math.round(Math.random()*100)}`,`last meal: ${Math.round(Math.random()*10)} hours ago`]
        }   
        console.log(`Lab results \n ${this.name} ${this.surname} JMBG:${this.jmbg}
        Testing ${type} \n Results: ${results.map((result) => result)} \n Date: ${date} ${time} `)
        
    }

}
function getDateTime(){
    const date = new Date()
    const dd = date.getDate();
    const mm = date.getMonth() +1;
    const yy = date.getFullYear();
    const hh = date.getHours();
    const min = date.getMinutes();
    return `${dd}.${mm}.${yy} ${hh}:${min}`

}
let Dragan = new Patient("Dragan","Draganovic",1234,1); console.log(getDateTime(),"Created patient Dragan")
let Milan = new Doctor("Milan","Milanovic","ORL"); console.log(getDateTime(),"Created doctor Milan")
Dragan.assignDoctor(Milan); console.log(getDateTime(),"Assinged doctor Milan to patient Dragan")
Milan.makeLabAppointment(Dragan,'1/1/2023','20:00',"blood sugar level"); 
Milan.makeLabAppointment(Dragan,'1/1/2023','21:00',"blood pressure");
Dragan.doLabWork("blood sugar level",'1/1/2023','20:00'); console.log(getDateTime(),"Patient Dragan takes the blood sugar level lab test")
Dragan.doLabWork("blood pressure",'1/1/2023','21:00'); console.log(getDateTime(),"Patient Milan takes the blood sugar level lab test")

