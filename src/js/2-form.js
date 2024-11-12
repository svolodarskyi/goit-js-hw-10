const formData = {
    email: "",
    message: ""
}

const STORAGE_KEY = "feedback-form-state"
const form = document.querySelector(".feedback-form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");

populateFormOnLoad()
form.addEventListener("input", handleInput)
form.addEventListener("submit", handleSubmit)

function getDataFromLocalStorage(storageKey) {
    const fromLocalStorage = localStorage.getItem(storageKey);
    return fromLocalStorage ? JSON.parse(fromLocalStorage) : null;  
}

function getDataFromForm() {
    return { "email": input.value.trim(), "message": textarea.value.trim()}
}

function handleInput(event) {
    event.preventDefault();
    const { email, message } = getDataFromForm();
    if (email) formData['email'] = email;
    if (message) formData['message'] = email;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

function handleSubmit(event) {
    const { email, message } = getDataFromForm();

    if (!(email && message)) {
        alert("Fill please all fields")
    }
    else {
        event.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        console.log(`Email: ${email}. Message: ${message}`)
        input.value = '';
        textarea.value = '';
    }
    
}

function populateFormOnLoad() {
    const fromLocalStorage = getDataFromLocalStorage(STORAGE_KEY);
    if (fromLocalStorage) {
        input.value = fromLocalStorage['email'];
        textarea.value = fromLocalStorage['message'];
    }
}