     
    const aCourse = {
        code: 'CSE121b',
        name: 'Javascript Language',
        logo: 'images/js-logo.png',
        sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro Awesome'},
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis Beast'},
        { sectionNum: 3, roomNum: 'STC 231', enrolled: 10, days: 'MWF', instructor: 'Bro Cool'},
        { sectionNum: 4, roomNum: 'STC 398', enrolled: 15, days: 'MWF', instructor: 'Sis Dope'},
        { sectionNum: 5, roomNum: 'STC 394', enrolled: 20, days: 'MWF', instructor: 'Bro Epic'},
        { sectionNum: 6, roomNum: 'STC 245', enrolled: 18, days: 'TTh', instructor: 'Sis Fantastic'},
        ],
        enrollStudent: function (sectionNum) {
            // find the right section...Array.findIndex will work here
            const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNum == sectionNum
            );
            if (sectionIndex === -1) {
            alert("Section not found");
            }
            else if (sectionIndex >= 0) {
            this.sections[sectionIndex].enrolled++;
            renderSections(this.sections);
            }
        }
    };

    function sectionTemplate(section) {
        return `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td></tr>`
    }

    function renderSections(sections) {
    const html = sections.map(sectionTemplate);
    document.querySelector("#sections").innerHTML = html.join("");
    }

    renderSections(aCourse.sections);

    document.querySelector("#enrollStudent").addEventListener("click", function () {
        const sectionNum = document.querySelector("#sectionNumber").value;
        aCourse.enrollStudent(sectionNum);
    });

    const addSectionButton = document.querySelector("#addSection");
    addSectionButton.addEventListener("click", function () {
        const newSectionNum = aCourse.sections.length + 1;
        const newRoomNum = document.querySelector("#newRoomNumber").value;
        const newEnrolled = parseInt(document.querySelector("#newEnrolled").value);
        const newDays = document.querySelector("#newDays").value;
        const newInstructor = document.querySelector("#newInstructor").value;

        const newSection = {
            sectionNum: newSectionNum,
            roomNum: newRoomNum,
            enrolled: newEnrolled,
            days: newDays,
            instructor: newInstructor
        };

        aCourse.sections.push(newSection);
        renderSections(aCourse.sections);
        const clearFields = document.querySelectorAll(".newSectionInput");
        clearFields.forEach(field => field.value = "");
    });
          