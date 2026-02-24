     
    const aCourse = {
        code: 'CSE121b',
        name: 'Javascript Language',
        logo: 'images/js-logo.png',
        sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro A'},
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis B'},
        { sectionNum: 3, roomNum: 'STC 231', enrolled: 10, days: 'MWF', instructor: 'Bro C'},
        { sectionNum: 4, roomNum: 'STC 101', enrolled: 15, days: 'MWF', instructor: 'Sis D'},
        { sectionNum: 5, roomNum: 'STC 102', enrolled: 20, days: 'MWF', instructor: 'Bro E'},
        { sectionNum: 6, roomNum: 'STC 103', enrolled: 18, days: 'TTh', instructor: 'Sis F'},
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
          