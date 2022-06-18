// calculate handler
const calculateHandler = document.getElementById("calculateHandle");
// saveing handler
const saveingHandler = document.getElementById("saveing_handle");

// total expenses money , total_balance ,saveing_amount,remaining_amount
let totalExpensesText = document.getElementById("total_expenses");
let totalBalanceText = document.getElementById("total_balance");
let saveingAmountText = document.getElementById("saveing_amount");
let remainingAmountText = document.getElementById("remaining_amount");

// start error message
let msgSaveing = document.getElementById("msgSaveing");
let msgIncome = document.getElementById("msgIncome");
let msgFood = document.getElementById("msgFood");
let msgRent = document.getElementById("msgRent");
let msgClothes = document.getElementById("msgClothes");
let msgCalculate = document.getElementById("msgCalculate");
// end error message

// get input text
let inputIncome = document.getElementById("income");
let inputFood = document.getElementById("food");
let inputRent = document.getElementById("rent");
let inputClothes = document.getElementById("clothes");
let saveMoney = document.getElementById("save_money");

//show error message
function showErrorMessage(
  validationIncome,
  validationFood,
  validationRent,
  validationClothes,
  saveingAmount
) {
  if (!validationIncome) {
    msgFood.innerText = "";
    msgRent.innerText = "";
    msgClothes.innerText = "";
    msgIncome.innerText = "Income Input not valid!";
    return false;
  } else if (!validationFood) {
    msgIncome.innerText = "";
    msgRent.innerText = "";
    msgClothes.innerText = "";
    msgFood.innerText = "Food Input not valid!";
    return false;
  } else if (!validationRent) {
    msgIncome.innerText = "";
    msgFood.innerText = ""
    msgClothes.innerText = "";
    msgRent.innerText = "Rent Input not valid!";
    return false;
  } else if (!validationClothes) {
    msgIncome.innerText = "";
    msgFood.innerText = "";
    msgRent.innerText = "";
    msgClothes.innerText = "Clothes Input not valid!";
    return false;
  } else if (!saveingAmount) {
    msgIncome.innerText = "";
    msgRent.innerText = "";
    msgSaveing.innerText = "Please give a valid number for save money!";
    return false;
  } else {
    msgIncome.innerText = "";
    msgFood.innerText = "";
    msgRent.innerText = "";
    msgClothes.innerText = "";
    msgSaveing.innerText = "";
    return true;
  }
}
// input value validation
function validation(value) {
  if (isNaN(value) || value <= 0 || !Number(value)) {
    return false;
  } else {
    return true;
  }
}

// input Value Floating number
function inputValueFloat(value) {
  return parseFloat(value);
}

//Total expenses Calculate
function expensesCalculate(food, rent, clothe) {
  return food + rent + clothe;
}
// input value empty
function inputValueNull(inputFood, inputRent, inputClothes) {
  inputFood.value = "";
  inputRent.value = "";
  inputClothes.value = "";
}

// disable  save button
function disableSaveButton() {
  if (inputValueFloat(totalBalanceText.innerText) == 0) {
    saveingHandler.setAttribute("disabled", "disabled");
  }else{
    // disable remove save button
      saveingHandler.removeAttribute("disabled");
    }
}
disableSaveButton()

// Calculate Money Handler
calculateHandler.addEventListener("click", function () {
  
  // empty value
  msgCalculate.innerText = "";
  saveMoney.value = "";
  saveingAmountText.innerText = 0;
  remainingAmountText.innerText = 0;


  // validation input value
  const validationIncome = validation(inputIncome.value);
  const validationFood = validation(inputFood.value);
  const validationRent = validation(inputRent.value);
  const validationClothes = validation(inputClothes.value);

  const success = showErrorMessage(
    validationIncome,
    validationFood,
    validationRent,
    validationClothes,
    true
  );
  if (success) {
    const totalIncome = inputValueFloat(inputIncome.value);
    const totalFood = inputValueFloat(inputFood.value);
    const totalRent = inputValueFloat(inputRent.value);
    const totalClothes = inputValueFloat(inputClothes.value);

    const totalExpenses = expensesCalculate(totalFood, totalRent, totalClothes);
    const totalBalance = totalIncome - totalExpenses;
    msgCalculate.innerText = "";
    if (totalIncome > totalExpenses) {
      totalExpensesText.innerText = totalExpenses.toFixed(2);
      totalBalanceText.innerText = totalBalance.toFixed(2);
      inputValueNull(inputFood, inputRent, inputClothes);
      msgCalculate.innerText = "";
      disableSaveButton()
    } else {
      msgCalculate.innerText = "Your income is not enough money!";
      inputValueNull(inputFood, inputRent, inputClothes);
    }
  }
});

// saveing amount handler
saveingHandler.addEventListener("click", function () {
  // Total income value
  const totalIncome = document.getElementById("income").value;

  // validation with validation function
  const saveMoneyValidation = validation(saveMoney.value);
  const totalIncomeValidation = validation(totalIncome);

  // check error message
  const success = showErrorMessage(
    totalIncomeValidation,
    true,
    true,
    true,
    saveMoneyValidation
  );

  if (success) {
    const saveingAmount = (
      inputValueFloat(totalIncome) *
      (inputValueFloat(saveMoney.value) / 100)
    ).toFixed(2);

    const totalBalance = inputValueFloat(totalBalanceText.innerText);
    if (totalBalance > saveingAmount) {
      saveingAmountText.innerText = saveingAmount;
      remainingAmountText.innerText = (
        inputValueFloat(totalBalanceText.innerText) - saveingAmount
      ).toFixed(2);
      msgSaveing.innerText = "";
    } else {
      msgSaveing.innerText = "You have not enough money. You can't save money!";
    }
  }
});
