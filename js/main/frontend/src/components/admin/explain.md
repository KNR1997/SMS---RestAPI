Java

String name = 'Sonal'
Int age = 24
Boolean married = false

public Int sum(Int number1, Int number 2) {
    return number1 + number2;
}

public class Person {
    String name;
    Int age;
    Boolean married;
}

Person sonal = new Person();
Person lastiha = new Person();
Person kethaka = new Person();




Controller Layer



public void createPerson(Int age) {
    PersonService.createPerson(age)
}




Service Layer


PersonService
public void createPerson(Int age) {

    // person create
    Person sonal = new Person();
    sonal.age = age;
    sonal.save();

    NotficationService.sendNotification()
    EmailService.sendEmailToAdmin()
    PrfileService.sendProfile()
}


-----------------------------------------------
NotficationService
public void sendNotification(Int age) {
    // 
}

---------------------------------------------------
EmailService
public void sendEmailToAdmin(Int age) {
    // 
}


-----------------------------------------------

ProfileService
public void sendProfile(Int age) {
    // 
}









pubilc Int sum (Int x, Int y) {
    return x + y
}

class SomeRandomPersonClass {
    Int age
}


pubilc Int myAgeAfterSomeYear (Int x, SomeRandomPersonClass person) {
    return person.age + x;
}



class StudenUpdateRequest {
    Int age, 
    String name, 
    String status,
    String address,
    String typeId,
}


public void updateStudent(Int studentId, StudenUpdateRequest updateData) {
    Student student = someFunction(studentId)
   <!-- student =  [id: 1, name: sonalj, type: O/L,  age: 30, status: married] -->

   Type type = someFunction(typeId)



    student.name = updateData.name
    student.age = updateData.age
    student.status = updateData.status
    student.address = updateData.address
    student.type = type

    student.save()
}


