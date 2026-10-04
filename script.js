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

// ===== Data: velden van het contactformulier =====.
const velden = [
    {
        id: "naam",
        boodschap: "Vul je naam in (minimaal 2 karakters)"
    },
    {
        id: "email",
        boodschap: "Voer een geldig e-mailadres in met een '@' en een domein (bijv. .com, .nl)"
    },
    {
        id: "bericht",
        boodschap: "Vul je bericht in (minimaal 10 karakters)"
    }
];

// ===== Functie: controleer één formulierveld =====
function valideerVeld(veld) {

    const invoerveld = document.querySelector(`#${veld.id}`);
    const foutmelding = document.querySelector(`#${veld.id}-error`);

    const geldig = invoerveld.checkValidity();

    invoerveld.setAttribute("aria-invalid", !geldig);

    if (geldig) {
        foutmelding.textContent = "";
    } else {
        foutmelding.textContent = veld.boodschap;
    }

    return geldig;
}

// ===== Functie: koppel submit-event aan het contactformulier =====
function koppelFormulier() {
    const formulier = document.querySelector("#contact-form");
    if (!formulier) {
        return;
    }
    formulier.addEventListener("submit", (event) => {
        event.preventDefault();

        let alleGeldig = true;

        velden.forEach((veld) => {
            if (!valideerVeld(veld)) {
                alleGeldig = false;
            }
        });

        const status = document.querySelector("#form-status");

        if (!alleGeldig) {
            status.textContent = "Er zijn fouten gevonden in het formulier, controleer de velden en probeer het opnieuw.";
            return;
        }
        status.textContent = "Het formulier is succesvol ingediend. Ik neem zo snel mogelijk contact met je op. Bedankt!";
        formulier.reset();

    });

}

// ===== Functie: haal mijn repositories op bij de GitHub API =====
async function haalReposOp() {
    const response = await fetch("https://api.github.com/users/JelmerBS/repos");

    if (!response.ok) {
        throw new Error(`Status ${response.status}`);
    }

    return await response.json();
}

// ===== Functie: laad de repositories met laad- en foutstatus =====
async function laadRepos() {
    const status = document.querySelector("#repo-status");

    if (!status) {
        return;
    }

    status.textContent = "Repositories worden geladen...";

    try {
        const repos = await haalReposOp();
        toonRepos(repos);
        status.textContent = "";
    } catch (error) {
        status.textContent = "De repositories konden niet worden geladen. Probeer het later opnieuw.";
    }
}

// ===== Functie: zet alle repos op de pagina =====
function toonRepos(repos) {

    const repoLijst = document.querySelector("#repo-lijst");

    if (!repoLijst) {
        return;
    }

    repoLijst.replaceChildren();

    repos.forEach((repo) => {
        const listItem = document.createElement("li");
        const titel = document.createElement("h3");
        const link = document.createElement("a");
        const beschrijving = document.createElement("p");

        link.textContent = repo.name;
        link.href = repo.html_url;
        beschrijving.textContent = repo.description || "Geen beschrijving";

        titel.appendChild(link);
        listItem.appendChild(titel);
        listItem.appendChild(beschrijving);
        repoLijst.appendChild(listItem);

    });


}

laadRepos();

koppelFormulier();

koppelFilterKnoppen();

toonProjecten(projecten);