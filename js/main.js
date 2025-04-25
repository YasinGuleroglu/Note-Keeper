const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  //  Html'den Javascript'e çekilen elemanlar
  const addBox = document.querySelector(".add-box");
  const popupBoxContainer = document.querySelector(".popup-box");
  const popupBox = document.querySelector(".popup");
  const closeBtn = document.querySelector("#close-btn");
  const form = document.querySelector("form");
  const wrapper = document.querySelector(".wrapper");
  let popupTitle = document.querySelector("header p");
  let submitBtn = document.querySelector("#submit-btn");
  
  let notes;
try {
  const data = JSON.parse(localStorage.getItem("notes"));
  notes = Array.isArray(data) ? data : [];
} catch (e) {
  notes = [];
}
  
  let isUpdate = false;
  let updateId = null;
  
  document.addEventListener("DOMContentLoaded", () => {
    renderNotes(notes);
  });
  
  // * addBox elemanına tıklanınca popup'ı aç
  
  addBox.addEventListener("click", () => {
    popupBoxContainer.classList.add("show");
    popupBox.classList.add("show");
  
    document.querySelector("body").style.overflow = "hidden";
  });
  
  // * closeBtne tıklanınca popup kapatır
  closeBtn.addEventListener("click", () => {
    popupBoxContainer.classList.remove("show");
    popupBox.classList.remove("show");
  
    document.querySelector("body").style.overflow = "auto";
  
    isUpdate = false;
    updateId = null;
    popupTitle.textContent = "New Note";
    submitBtn.textContent = "Add Note";
  
    form.reset();
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const titleInput = e.target[0];
    const descriptionInput = e.target[1];
  
    let title = titleInput.value.trim();
    let description = descriptionInput.value.trim();
  
    if (!title && !description) {
      alert("Lütfen formdaki gerekli kısımları doldurunuz !");
  
      return;
    }
      const date = new Date();
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const id = date.getTime();
  
    if (isUpdate) {
      const findIndex = notes.findIndex((note) => note.id == updateId);
    
      notes[findIndex] = {
        title,
        description,
        id,
        date: `${month} ${day},${year}`,
      };
  
      isUpdate = false;
      updateId = null;
      popupTitle.textContent = "New Note";
      submitBtn.textContent = "Add Note";
    } else {
  
      let noteInfo = {
        id,
        title,
        description,
        date: `${month} ${day},${year}`,
      };
  
      notes.push(noteInfo);
    }
  
    localStorage.setItem("notes", JSON.stringify(notes));
  
    form.reset();
  
    popupBoxContainer.classList.remove("show");
    popupBox.classList.remove("show");
  
    document.querySelector("body").style.overflow = "auto";
  
    renderNotes(notes);
  });
    
  function renderNotes(notes) {
    document.querySelectorAll(".note").forEach((li) => li.remove());
  
    notes.forEach((note) => {
      let noteEleman = `<li class="note" data-id='${note.id}'>
    
          <!-- Note Details -->
          <div class="details">
            <!-- Title && Description -->
            <p class="title">${note.title}</p>
            <p class="description">${note.description}</p>
          </div>
          <!-- Bottom -->
          <div class="bottom">
            <span>${note.date}</span>
            <div class="settings">
              <!-- Icon -->
              <i class="bx bx-dots-horizontal-rounded"></i>
              <!-- Menu -->
              <ul class="menu">
                <li class='editIcon'><i class="bx bx-edit"></i> Düzenle</li>
                <li class='deleteIcon'><i class="bx bx-trash-alt"></i> Sil</li>
              </ul>
            </div>
          </div>
        </li>`;
  
      addBox.insertAdjacentHTML("afterend", noteEleman);
    });
  };
    
  function showMenu(eleman) {
  
    eleman.parentElement.classList.add("show");
  
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "I" || e.target != eleman) {
        eleman.parentElement.classList.remove("show");
      }
    });
  }
  
  wrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
      showMenu(e.target);
    }
    else if (e.target.classList.contains("deleteIcon")) {
      const res = confirm("Bu notu silmek istediğinize eminmisiniz ?");
  
      if (res) {
  
        const note = e.target.closest(".note");
  
        const notedId = parseInt(note.dataset.id);
  
        notes = notes.filter((note) => note.id != notedId);
  
        localStorage.setItem("notes", JSON.stringify(notes));
  
        renderNotes(notes);
      }
    }
    else if (e.target.classList.contains("editIcon")) {

      const note = e.target.closest(".note");

      const noteId = parseInt(note.dataset.id);

      const foundedNote = notes.find((note) => note.id == noteId);
  
      isUpdate = true;
      updateId = noteId;
  
      popupBoxContainer.classList.add("show");
      popupBox.classList.add("show");
  
      form[0].value = foundedNote.title;
      form[1].value = foundedNote.description;
  
      popupTitle.textContent = "Update Note";
      submitBtn.textContent = "Update";
    }
  });
  