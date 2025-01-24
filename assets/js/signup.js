import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  ref,
  set,
  firestore,
  database,
} from "./firebaseConfig.js";

console.log("Firebase modules imported.");

const signUpForm = document.getElementById("sign-up-form");
const registrationMessage = document.getElementById("signUpMessage");
console.log("Sign-up form and message elements selected.");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Sign-up form submitted.");

  const formData = new FormData(signUpForm);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  console.log("Form data collected:", {
    username,
    email,
    password,
    confirmPassword,
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!username || !email || !password || !confirmPassword) {
    registrationMessage.textContent = "Please fill in all fields.";
    console.log("Validation failed: missing fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    registrationMessage.textContent = "Invalid email format.";
    console.log("Validation failed: invalid email format.");
    return;
  }

  if (!passwordPattern.test(password)) {
    registrationMessage.textContent =
      "Password must be at least 8 characters long and contain at least one numeric digit, one uppercase and one lowercase letter.";
    console.log("Validation failed: password does not meet criteria.");
    return;
  }

  if (password !== confirmPassword) {
    registrationMessage.textContent = "Passwords do not match.";
    console.log("Validation failed: passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential);

    const user = userCredential.user;
    const userData = { uid: user.uid, username, email };
    console.log("User data to save:", userData);

    await setDoc(doc(firestore, "users", user.uid), userData);
    console.log("User data saved to Firestore.");

    await set(ref(database, `users/${user.uid}`), userData);
    console.log("User data saved to Realtime Database.");

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true");
    console.log("User data saved to localStorage.");

    registrationMessage.textContent = "Registration successful!";
    console.log("Before redirection");
    setTimeout(() => {
      console.log("Redirecting to index.html...");
      window.location.href = "../../index.html";
    }, 300);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    registrationMessage.textContent = `${error.message}`;
  }
});

const signInForm = document.getElementById("sign-in-form");
const signInMessage = document.getElementById("signInMessage");
console.log("Sign-in form and message elements selected.");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Sign-in form submitted.");

  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;
  console.log("Sign-in data collected:", { email, password });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    signInMessage.textContent = "Please fill in all fields.";
    console.log("Validation failed: missing fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    signInMessage.textContent = "Invalid email format.";
    console.log("Validation failed: invalid email format.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential);

    const user = userCredential.user;
    const userData = { email: user.email, uid: user.uid };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "false");
    localStorage.setItem("uid", user.uid);
    console.log("User data saved to localStorage.");

    signInMessage.textContent = "Sign-in successful!";
    setTimeout(() => {
      console.log("Redirecting to index.html...");
      window.location.href = "../../index.html";
    }, 300);
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    signInMessage.textContent = `${error.message}`;
  }
});

const googleSignInBtn = document.getElementById("googleSignInBtn");
googleSignInBtn.addEventListener("click", async () => {
  console.log("Google sign-in button clicked.");
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in result:", result);

    const user = result.user;
    const [username] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = { username, email: user.email, uid: user.uid };

    await setDoc(doc(firestore, "users", user.uid), userData);
    console.log("User data saved to Firestore.");

    await set(ref(database, `users/${user.uid}`), userData);
    console.log("User data saved to Realtime Database.");

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true");
    localStorage.setItem("uid", user.uid);
    console.log("User data saved to localStorage.");

    registrationMessage.textContent = "Google sign-in successful!";
    setTimeout(() => {
      console.log("Redirecting to index.html...");
      window.location.href = "../../index.html";
    }, 300);
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
    registrationMessage.textContent = `${error.message}`;
  }
});

const googleSignUpBtn = document.getElementById("googleSignUpBtn");
googleSignUpBtn.addEventListener("click", async () => {
  console.log("Google sign-up button clicked.");
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-up result:", result);

    const user = result.user;
    const [username] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = { username, email: user.email, uid: user.uid };

    await setDoc(doc(firestore, "users", user.uid), userData);
    console.log("User data saved to Firestore.");

    await set(ref(database, `users/${user.uid}`), userData);
    console.log("User data saved to Realtime Database.");

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true");
    localStorage.setItem("uid", user.uid);
    console.log("User data saved to localStorage.");

    registrationMessage.textContent = "Google sign-up successful!";
    setTimeout(() => {
      console.log("Redirecting to index.html...");
      window.location.href = "../../index.html";
    }, 300);
  } catch (error) {
    console.error("Error during Google sign-up:", error.message);
    registrationMessage.textContent = `${error.message}`;
  }
});

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
console.log("Sign-in/up buttons and container selected.");

sign_up_btn.addEventListener("click", () => {
  console.log("Sign-up button clicked.");
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  console.log("Sign-in button clicked.");
  container.classList.remove("sign-up-mode");
});
