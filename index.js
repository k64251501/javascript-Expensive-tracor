var state ={
    balance: 1000,
    income:400,
    expense:100,
    transation:[{ id:uniqueId(), name: 'salary', amount: 1000, type: 'income'},
    {id:uniqueId(), name: 'Buy Grocery', amount: 50, type: 'expense'},
    {id:uniqueId(), name: 'Buy Guitar', amount: 500, type: 'expense'}

    ]
}
var balanceEl= document.querySelector("#balance");
var incomeEl= document.querySelector('#income');
var expenseEl= document.querySelector('#expense');
var transationEl= document.querySelector('#transaction');
var incomeBtnEl= document.querySelector('#incomeBtn');
var expenseBtnEl= document.querySelector('#expenseBtn');
var nameInputEl= document.querySelector('#name');
var amountInputEl= document.querySelector('#amount');
function init (){
    updateState();
    initListeners();
}
function uniqueId(){
    return Math.round(Math.random()* 1000000);
}
function initListeners(){
    incomeBtnEl.addEventListener('click',onAddIncomeClick);
    expenseBtnEl.addEventListener('click',onAddExpenseClick);
}
function onAddIncomeClick(){
    addTransaction(nameInputEl.value, amountInputEl.value ,'income');
    
        
}
function addTransaction(name , amount, type){
    var name= nameInputEl.value;
    var amount = amountInputEl.value;
    if (name !=='' && amount !==''){
        var transation = {id: uniqueId(), name: name, 
            amount: parseInt(amount), type: type};
            state.transation.push(transation);

        console.log(state)
        updateState()
    }else {
        alert('please enter valid data')
    }
    nameInputEl.value = '';
    amountInputEl.value= '';
}
function onAddExpenseClick(){
    addTransaction(nameInputEl.value, amountInputEl.value, 'expense')
    // var name= nameInputEl.value;
    // var amount = amountInputEl.value
    // if (name !=='' && amount !==''){
    //     var transation = {name: nameInputEl.value, 
    //         amount: parseInt(amountInputEl.value), type: 'income'};
    //         state.transation.push(transation);

    //     console.log(state)
    //     updateState()
    // }else {
    //     alert('please enter valid data')
    // }
    // console.log('expense', )
}
function onDeleteClick(event){
  console.log(event.target);
  var id =parseInt(event.target.getAttribute('data-id'));
  var deleteIndex;
  debugger; 
  for (var i=0; i<state.transation.length; i++){
   if (state.transation[i].id ===id){
    deleteIndex=i;
    break;
   }
  }
  state.transation.splice(deleteIndex, 1)
  updateState()
}

function updateState(){
    var balance= 0,
    income=0 ,
    expense=0;
    for (var i =0; i <state.transation.length; i++){
        item = state.transation[i];
        if (item.type === 'income'){
            income += item.amount
        }else if (item. type === 'expense'){
            expense += item.amount;
        }
    }
    balance = income - expense;
    console.log(balance, income, expense);
    state.balance= balance;
    state.income= income ;
    state.expense = expense;

    render();
}
    
function render(){
    console.log("init")
    balanceEl.innerHTML= `$${state.balance}`;
    incomeEl.innerHTML=`$${state.income}`;
    expenseEl.innerHTML=`$${state.expense}`;
    // var transation =document.createElement('li');
    var transationEl,containerEl, amountEl ,item, btnEl;
    //    transationEl.innerHTML = "";

    for (var i =0; i<state.transation.lenght; i++){
        item =state.transation[i];
           transationEl = document.createElement('li')
           transationEl.append(state.transation[i].name);
           transationEl.appendChild(transationEl);
           containerEl   =document.createElement('div');
           amountEl =document.createElement('sapn');
           if (item.type=== 'income'){
                amountEl.classList.add('income-amt');

           }else if (item.type === 'expense'){
            amountEl.classList.add('expense-amt');
           }
           amountEl.innerHTML= `$${item.amount}`;
           containerEl.appendChild(amountEl);
           btnEl= document.createElement('button');
           btnEl.setAttribute('data-id',item.id);
           btnEl.innerHTML= 'cancel';
          btnEl.addEventListener('click', onDeleteClick);
           containerEl.appendChild(btnEl)
           transationEl.appendChild(containerEl)
    }
}
init();