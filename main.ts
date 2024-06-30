import inquirer from 'inquirer';
import { relative } from 'path/posix';
class student{
    static id_counter:number = 0;
    studentid:number
 courses:string[]=[];
 balance:number =0;
 constructor(private name:string){
student.id_counter++;
this.studentid = this.gerentestudentid();
 }
gerentestudentid(){
    return 1000 + student.id_counter
}
enrollcourse(course:string){
this.courses.push(course);
this.balance += 1000
}
viewbalance(){
    return this.balance
}
paycousefee(amount:number){
    this.balance-= amount
}
showstatus(){
    console.log(`
        name:${this.name}
        studentiD:${this.studentid}
        courses:${this.courses.join(",")}
        balance:${this.balance}`)
}
getstudentid():number{
return this.studentid
}
getstudentname(){
return this.name;
}

}

const students:student[]=[]
async function mainmenu(){
    const userinputmenu = await inquirer.prompt({
        type:'list',
        name:'menu',
        message:'select your menu',
        choices:[
            "add new student",
            "student enroll in coure",
            "view student balance",
            "pay courses fees",
            "show student status",
            "end menu"
        ]

    });
    
    const{menu}=userinputmenu;
    if(menu === "add new student") await addnewstudent();
    if(menu ==="student enroll in coure")await enrollstudent();
    if(menu ==="view student balance")await viewbalance();
    if(menu ==="pay courses fees")await paytution();
    if(menu ==="end menu"){
        console.log('thanks for using student magement system');
        process.exit();
    }
}
async function addnewstudent() {
    const userinput = await inquirer.prompt({
        type:"input",
        name:'name',
        message:'enter student name here'
    });
    const student = new student(userinput.name)
    
    students.push(student);
    console.log(`student${student.getname()}added with studentid${student.gerentestudentid()}`)
    
}
async function enrollstudent() {
    const student= await selectstudent()
    if(student){
        const userinput = await inquirer.prompt({
            type:'list',
            name:'courses',
            message:'select course to enroll',
            choices:['typescript','javascript','python','c++']
        });
        student.enrollcourse(userinput.course);
        console.log(`enrolled in course:${userinput.coure}`)
    }

        }
        async function viewbalance() {
            const student = await selectstudent();
            if(student){
                console.log(`balance: ${student.viewbalance()}`)
            }
        }
    async function paytution(){
        const student=await selectstudent();
        if (student){
            const userinput = await inquirer.prompt({
                type:'input',
                name:'amount',
                message:'enter amount you want to pay?'
            });
            student.paycousefee(parseFloat(userinput.amount));
            console.log(`paid ${userinput.amount}balace remining${student.viewbalance()}`)
        }
    }
    
async function showstatus() {
    const student = await selectstudent();
    if(student){
        student.showstatus();
    }
}
async function selectstudent(){
    if(students.length === 0){
        console.log(`no student available`)
    }
    else{
        const stdselect = await inquirer.prompt({
            type:'list',
            name:'stdiD',
            message:'select a student',
            choices:students.map((std)=>({
            name:std.getstudentname(),
            value:std.getstudentid()
            }))
        });
        return(
            students.find((std)=>std.gerentestudentid()===stdselect.stdiD)||null
        )
    }
}
mainmenu();