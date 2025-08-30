fetch("../../data/students.json")
.then(function(response){
    return response.json();
})
.then(function(students){
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for(let student of students){
        out += `
            <tr>
                <td> <img src='${student.idphoto}'></td>
                <td>${student.rollno}</td>
                <td>${student.name}</td>
                <td>${student.fathername}</td>
                <td>${student.branch}</td>
                <td>${student.hostel}</td>
                <td>${student.cgpa}</td>
            </tr>
        `;
    }
    placeholder.innerHTML = out;
});


document.addEventListener("input", function (e) {
  if (e.target.id === "searchBox") {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#data-output tr");
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  }
});
