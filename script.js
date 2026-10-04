// ===== Data: mijn projecten =====
const projecten = [
    {
        titel: "Project Marine Guardian",
        beschrijving: "In het Marine Guardian project heb ik met mijn project groep gewerkt aan een slimme prullenbak die met een puntensysteem het aantal plastic in onze wateren moet gaan verlagen. We hebben een prototype ontwikkeld die gepaard met nfc pasjes persoonlijke scores kon bijhouden aan de hand van ingeleverde plastic flesjes en blikjes. We hebben dit project met een 7 afgerond op onze opleiding. De kennis die hier voor gevraagd werd was vooral C# en SQL.",
        taal: "C#",
        jaar: 2025
    },
    {
        titel: "Hotel Simulator",
        beschrijving: "Ik heb samen met mijn projectgroep in mijn 2e semester van de HBO ICT opleiding een simulator gemaakt die een hotel gebaseerd op hele specifieke eisen van onze stakeholder kon simuleren. Het hotel functioneerde volledig met schoonmakers, evenementen zoals een brandalarm en een werkend check in en uit systeem. Dit project vroeg om kennis over java.",
        taal: "Java",
        jaar: 2025
    },
    {
        titel: "Dummy project 1",
        beschrijving: "Vervang deze tekst door een eigen project.",
        taal: "JavaScript",
        jaar: 2026
    },
    {
        titel: "Dummy project 2",
        beschrijving: "Vervang deze tekst door een eigen project.",
        taal: "Java",
        jaar: 2024
    },
    {
        titel: "Dummy project 3",
        beschrijving: "Vervang deze tekst door een eigen project.",
        taal: "C#",
        jaar: 2026
    },
    {
        titel: "Dummy project 4",
        beschrijving: "Vervang deze tekst door een eigen project.",
        taal: "HTML/CSS",
        jaar: 2026
    }
];

// ===== Functie: zet alle projecten op de pagina =====
function toonProjecten(lijstVanProjecten) {

    const projectenlijst = document.querySelector("#projecten-lijst");

    if (!projectenlijst) {
        return; 
    }

    projectenlijst.replaceChildren();

    lijstVanProjecten.forEach((project) => {
        
        const artikel = document.createElement("article");
        const titel = document.createElement("h3");
        const tekst = document.createElement("p");

        titel.textContent = project.titel;
        tekst.textContent = project.beschrijving;

        artikel.appendChild(titel);
        artikel.appendChild(tekst);
        projectenlijst.appendChild(artikel);

    });


}

// ===== Functie: filter projecten op taal =====
function filterProjecten(taal) {

    if (taal === "Alle") {
        toonProjecten(projecten);
        return;
    }

    const gefilterd = projecten.filter((project) => project.taal === taal);

    toonProjecten(gefilterd);
}

function koppelFilterKnoppen() {
    const knoppen = document.querySelectorAll("#filter-knoppen button");

    knoppen.forEach((knop) => {
        knop.addEventListener("click", () => {
            const taal = knop.getAttribute("data-taal");
            filterProjecten(taal);
        });
    });
}

koppelFilterKnoppen();

toonProjecten(projecten);