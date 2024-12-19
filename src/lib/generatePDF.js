import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default async function generatePDF(data) {
    const doc = new jsPDF("portrait", "mm", "a4");
    const headerFontSize = 16;
    const subHeaderFontSize = 12;
    const tableFontSize = 10;
    const pageWidth = doc.internal.pageSize.width;
    let startY = 20;

    // Load the logo
    const logo = await fetch("/uni.png")
        .then((res) => res.blob())
        .then((blob) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        });

    // Header with logo and text
    const logoWidth = 27;
    const logoHeight = 20;
    const logoX = 15;
    const logoY = startY - 5;
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

    const textStartX = logoX + logoWidth + 10;
    const textWidth = pageWidth - textStartX - 15;
    doc.setFont("times", "bold");
    doc.setFontSize(headerFontSize);
    doc.text(data.universityName, textStartX + textWidth / 2, startY, {
        align: "center",
    });

    startY += 6;
    doc.setFontSize(subHeaderFontSize);
    doc.text(data.examDetails.title, textStartX + textWidth / 2, startY, {
        align: "center",
    });

    startY += 5;
    doc.setFont("times", "italic");
    doc.setFontSize(subHeaderFontSize - 2);
    doc.text(`(${data.examDetails.session})`, textStartX + textWidth / 2, startY, {
        align: "center",
    });

    startY += 5;

    // First, add all content except the course info table
    // Store the position where course info table will be
    const courseInfoY = startY;

    // Skip space for course info table (approximate height)
    startY += 60;

    // Add groups and questions
    data.groups.forEach((group) => {
        doc.setFont("times", "bold");
        doc.setFontSize(subHeaderFontSize);
        doc.text(group.title, 105, startY, { align: "center" });

        doc.setFontSize(subHeaderFontSize);
        doc.setFont("times", "italic");
        doc.text(group.instructions, 105, startY + 6, { align: "center" });

        const formattedQuestions = group.questions.flatMap((q) => {
            if (q.type === "alternative") {
                const alternativeRows = [];
                for (let i = 0; i < q.questions.length; i++) {
                    const altQ = q.questions[i];
                    alternativeRows.push([altQ.number, altQ.text, altQ.level, altQ.outcome]);
                    if (i < q.questions.length - 1) {
                        alternativeRows.push([{ content: "OR", colSpan: 4, styles: { fontStyle: "bold", halign: "center" } }]);
                    }
                }
                return alternativeRows;
            } else {
                return [[q.number, q.text, q.level, q.outcome]];
            }
        });

        doc.autoTable({
            startY: startY + 10,
            head: [["Q No.", "Question", "Knowledge Level (L1-6)", "Course Outcome (CO1-5)"]],
            body: formattedQuestions,
            theme: "grid",
            styles: {
                font: "times",
                fontSize: tableFontSize,
                textColor: [0, 0, 0],
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            columnStyles: {
                0: { cellWidth: 10, halign: "center" },
                1: { cellWidth: 130 },
                2: { cellWidth: 25, halign: "center" },
                3: { cellWidth: 25, halign: "center" },
            },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 8,
            },
        });

        startY = doc.lastAutoTable.finalY + 10;
    });

    // Calculate Total Pages
    const totalPages = doc.getNumberOfPages();

    // Go back to first page and add course info table with correct total pages
    doc.setPage(1);
    const courseInfoTable = [
        ["Name of the Program:", data.courseInfo.program.join(", "), "Semester:", data.courseInfo.semester],
        ["Course/Subject Name:", data.courseInfo.name, "Course/Subject Code:", data.courseInfo.code],
        ["Maximum Marks:", data.examParameters.maxMarks, "Time Duration:", data.examParameters.duration],
        ["Total No. of Questions:", data.examParameters.totalQuestions, "Total No. of Pages:", totalPages.toString()],
        [
            {
                content: "(Any other information for the student may be mentioned here)",
                styles: { fontStyle: "italic" },
            },
            { content: data.instructions.join("\n"), colSpan: 3 },
        ],
    ];

    doc.autoTable({
        startY: courseInfoY,
        body: courseInfoTable,
        theme: "grid",
        styles: {
            font: "times",
            fontSize: tableFontSize,
            textColor: [0, 0, 0],
            lineWidth: 0.1,
            lineColor: [0, 0, 0],
            fontStyle: "bold",
        },
        columnStyles: {
            0: { halign: "left", cellWidth: 50 },
            1: { halign: "left", cellWidth: 50 },
            2: { halign: "left", cellWidth: 50 },
            3: { halign: "left", cellWidth: 40 },
        },
    });

    // Save the document
    doc.save(`${data.courseInfo.code} ${data.examDetails.session} paper.pdf`);
}