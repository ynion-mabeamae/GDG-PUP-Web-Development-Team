# 🚀 Post Jam Activity: Enhance Your Pomodoro Timer!

Welcome to the **Post Jam Activity**! Now that you've built the basic Pomodoro Timer during the workshop, it's time to take it to the next level.

This folder contains the same Pomodoro Timer project, but with a **new Task Management section** that YOU will bring to life!

---

## 📋 Table of Contents

- [Your Mission](#your-mission)
- [Getting Started](#getting-started)
- [Challenge 1: Task Management](#challenge-1-task-management-required)
- [Bonus Challenges](#bonus-challenges-pick-any)
- [Helpful Resources](#helpful-resources)
- [Need Help?](#need-help)

---

## 🎯 Your Mission

You have **two main goals**:

1. **Required:** Implement the Task Management functions (`addTask`, `deleteTask`, `updateTaskCount`)
2. **Bonus:** Choose any additional feature from the challenge list and implement it!

---

## 🏁 Getting Started

### Step 1: Open the Project

Open `pomodoro.html` in your browser and `js/main.js` in your code editor.

### Step 2: Find the Task Functions

In `main.js`, scroll down to **Section 4: TASK FUNCTIONS**. You'll see three empty functions waiting for your code:

```javascript
function addTask() {
  // YOUR CODE HERE
}

function deleteTask(taskElement) {
  // YOUR CODE HERE
}

function updateTaskCount() {
  // YOUR CODE HERE
}
```

### Step 3: Uncomment the Event Listeners

At the bottom of the file in **Section 5**, uncomment the task-related event listeners:

```javascript
// Uncomment these when you're ready to test your functions!
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
```

### Step 4: Start Coding!

Now implement those functions and watch your tasks come to life!

---

## ✅ Challenge 1: Task Management (Required)

### What You Need to Build

The HTML already has a task section with:
- An input field (`#new-task-title`) for typing task names
- An "Add" button (`#add-task-btn`) to add tasks
- A task list (`#task-list`) to display all tasks
- A task counter (`#task-count-num`) showing the number of tasks

### Your Functions to Implement

#### 1. `addTask()`

This function should:
- Get the text from the input field
- Create a new task item and add it to the list
- Clear the input field after adding
- Handle empty input (don't add empty tasks!)

**Example HTML structure for a task item:**
```html
<li class="task-item">
  <div class="task-content">
    <span class="task-title">Your task text here</span>
  </div>
  <button class="btn-delete" onclick="deleteTask(this.parentElement)">
    <span class="material-symbols-rounded">delete</span>
  </button>
</li>
```

#### 2. `deleteTask(taskElement)`

This function should:
- Remove the task element from the DOM
- Update the task counter
- Show "No active tasks" if the list is empty

#### 3. `updateTaskCount()`

This function should:
- Count the number of tasks in the list
- Update the `#task-count-num` element with the count

### Tips & Hints

Here are some JavaScript methods that might help:

```javascript
// Getting input value
const value = taskInput.value;

// Creating elements
const li = document.createElement("li");
li.className = "task-item";
li.innerHTML = `<your HTML here>`;

// Adding to a list
taskList.appendChild(li);

// Removing an element
element.remove();

// Counting elements
const count = taskList.querySelectorAll(".task-item").length;

// Clearing input
taskInput.value = "";
```

---

## 🌟 Bonus Challenges (Pick Any!)

Once you've completed the task management feature, pick any of these challenges to make your Pomodoro Timer even more awesome!

---

### 🎨 Change Background Color

Make the background color change based on the timer mode!

**Ideas:**
- Blue background for Focus mode
- Green for Short Break
- Yellow/Orange for Long Break
- Or let users pick their own color!

**Hint:** Use `document.body.style.backgroundColor = "your-color"`

---

### 🎵 Add Background Music

Play relaxing music or ambient sounds while the timer is running!

**Ideas:**
- Lo-fi beats for focus sessions
- Nature sounds for breaks
- Different music for different modes

**Hint:** Use the HTML5 `<audio>` element:
```javascript
const audio = new Audio("your-music-file.mp3");
audio.play();
audio.pause();
```

---

### 🔔 Sound Notification When Timer Ends

Play a sound or alarm when the timer finishes!

**Ideas:**
- Bell sound when focus ends
- Soft chime for break ends
- Let users choose their notification sound

---

### 💾 Save Tasks to LocalStorage

Make tasks persist even after closing the browser!

**Hint:**
```javascript
// Save
localStorage.setItem("tasks", JSON.stringify(tasksArray));

// Load
const tasks = JSON.parse(localStorage.getItem("tasks"));
```

---

### ⌨️ Keyboard Shortcuts

Add keyboard controls for faster interaction!

**Ideas:**
- `Space` to start/pause timer
- `R` to reset timer
- `1`, `2`, `3` to switch modes
- `Enter` to add task (already provided!)

**Hint:**
```javascript
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    startTimer();
  }
});
```

---

### 📊 Session Counter & Statistics

Track how many focus sessions you've completed!

**Ideas:**
- Count completed pomodoros
- Show total focus time today
- Weekly/monthly statistics

**Hint:** The `#iteration-count` element is already there, just update it!

---

### 🌙 Dark/Light Mode Toggle

Add a toggle switch to change between dark and light themes!

**Ideas:**
- Add a moon/sun icon button
- Switch CSS variables for colors
- Save preference to localStorage

---

### ✏️ Edit Task Name

Allow users to click on a task to edit its name!

**Ideas:**
- Double-click to enter edit mode
- Replace text with an input field
- Save on Enter or blur

---

### ✅ Mark Tasks as Complete

Add checkboxes to mark tasks as done!

**Ideas:**
- Strike-through completed tasks
- Move completed tasks to the bottom
- Add a "Clear completed" button

---

### 🎯 Task Priority

Add priority levels to tasks!

**Ideas:**
- High, Medium, Low priority
- Color-coded indicators
- Sort by priority

---

## 📚 Helpful Resources

Here are some resources to help you with your implementation:

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN - DOM manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- [MDN - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN - Audio API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

## 🆘 Need Help?

If you get stuck:

1. **Check the browser console** (`F12` → Console tab) for error messages
2. **Use `console.log()`** to debug your code
3. **Ask a mentor** or workshop facilitator
4. **Search online** - StackOverflow and MDN are your friends!

---

## 🎉 Show Off Your Work!

When you're done, share your enhanced Pomodoro Timer with us! We'd love to see what creative features you came up with.

---

<div align="center">

**Happy Coding! 🚀**

*Made with ❤️ by GDG PUP Web Dev Team*

</div>
