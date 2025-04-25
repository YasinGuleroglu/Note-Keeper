
const users = ["Altan", "Didem", "Ali", "Işıl"];

localStorage.setItem("users", JSON.stringify(users));

console.log(JSON.parse(localStorage.getItem("users")));

