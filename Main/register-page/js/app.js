btn=document.getElementById("button5");
btn.addEventListener("mouseenter", myFunction);
btn.addEventListener("click", myFunction);

function myFunction() {
    btn.classList.toggle("wrong");
    
 };

 const registerPasssword=document.querySelector('form.register #password')
 const registerConfirmPasssword=document.querySelector('form.register #confirmpassword')


 registerPasssword.addEventListener('input',function(){
    registerConfirmPasssword.pattern= `${this.value}`;
 })