import {labType} from "./lab.js"
class Validation{
    constructor(){
        if(this.constructor == Validation){
            throw new Error("Can't instantiate labaratory")
        }
    }
    static testTypeError(type){
        if(type != "blood sugar level" && type != "blood pressure" && type != "cholesterol level"){
            throw new Error("That type of testing is not available at this lab")
        }
    }
    static notAssigned(patient,doctor){
        if(patient.doctor != doctor){
            throw new Error("You are not assigned to this patient"); //403
        }
    }
    static wrongTime(currentTime,time,currentDate,date){
        if(time != currentTime ||  date != currentDate){
            console.log("Your lab appointment is not scheduled at this time");
            return true;
        }
    }
}
class Labaratory{
    constructor(){
        if(this.constructor == Labaratory){
            throw new Error("Can't instantiate labaratory") //abstract class
        }
    }
    labForPatient= [];
    makeLabAppointment(patient,date,time,type){
        Validation.notAssigned(patient,this)
        Validation.testTypeError(type);
        console.log(`${patient.name} ${patient.surname} JMBG:${patient.jmbg} fileNo:${patient.fileNum}
        Lab appointment for ${type} \n Time: ${date} ${time}`)
        this.labForPatient.push({"type":type, "date":date,"time":time, "patient":patient} )
    }
    doLabWork(type,date,time){
        let tests = [];
        let results = [];
        const labId = this.doctor.labForPatient.findIndex((lab) =>  lab.type == type && lab.patient.jmbg == this.jmbg );
        if(labId === -1){
            console.log("I'm sorry you don't have an appointment")
            return;
        }
        if(Validation.wrongTime(time,this.doctor.labForPatient[labId].time,date,this.doctor.labForPatient[labId].date)){
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
class Doctor extends Labaratory{
    static id = 0;
    constructor(name,surname,specialty){
        super()
        this.name = name;
        this.surname = surname;
        this.specialty = specialty;
        Doctor.id++;
        this.id = Doctor.id
    }
}
class Patient extends Labaratory{
    doctor = ""
    static id = 0;
    constructor(name,surname,jmbg,fileNum){
        super()
        this.name = name;
        this.surname = surname;
        this.jmbg = jmbg;
        this.fileNum = fileNum;
        Patient.id++;
        this.id = Patient.id;
    }
    assignDoctor(doctor){
        this.doctor = doctor; 
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
function logEvents(message){
    console.log(getDateTime(),message)
}
let patient = new Patient("Dragan","Draganovic",1234,1); logEvents("Created patient Dragan")
let doctor = new Doctor("Milan","Milanovic","ORL"); logEvents("Created doctor Milan")
patient.assignDoctor(doctor); logEvents("Assinged doctor Milan to patient Dragan")
doctor.makeLabAppointment(patient,'1/1/2023','20:00',"blood sugar level"); 
doctor.makeLabAppointment(patient,'1/1/2023','21:00',"blood pressure");
patient.doLabWork("blood sugar level",'1/1/2023','22:00'); logEvents("Patient Dragan takes the blood sugar level lab test")
patient.doLabWork("blood pressure",'1/1/2023','21:00'); logEvents("Patient Milan takes the blood sugar level lab test")