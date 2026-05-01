import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

function About() {
    const { lang } = useContext(LanguageContext);

    return (
        <section className="about">
            <Link to="/">
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-move-left-icon lucide-move-left"
                    >
                        <path d="M6 8L2 12L6 16" />
                        <path d="M2 12H22" />
                    </svg>
                    Retourner sur plouaf!
                </button>
            </Link>
            <h2>À propos de plouaf! 🦆</h2>
            <p>
                plouaf! est né d'une idée simple : avoir un outil de tirage au sort disponible en breton.
                Parce que le breton, ça mérite aussi ses applis web. En s'inspirant du célèbre "plouf plouf"
                des cours de récré — cette petite comptine qu'on scandait pour désigner quelqu'un au hasard —
                le nom plouaf est né, avec une petite touche bretonne pour faire la différence. Depuis,
                l'appli a grandi et propose aujourd'hui bien plus qu'un simple tirage au sort.
            </p>
            <h2>Ce que fait plouaf! 🎲</h2>
            <p>
                Tirage au sort - Importe ta liste de noms, colle-la directement ou tape-la à la main. plouaf!
                désigne un gagnant en un clic. Tu peux sauvegarder tes listes et partager tes résultats. Pile
                ou face - Un doute ? Une décision impossible ? Laisse le hasard trancher. Lancer de dé - Un dé
                classique, toujours disponible, même quand t'en as pas sous la main. Générateur de nombres
                aléatoires - Choisis une fourchette, plouaf! s'occupe du reste.
            </p>
            <h2>8 langues, et le breton en premier 🌍</h2>
            <p>
                plouaf! est disponible en breton, français, anglais, italien, espagnol, allemand et ukrainien.
                Parce que le hasard n'a pas de frontières — et que le breton méritait bien sa place dans la
                liste.
            </p>
            <h2>Gratuit, libre et open source</h2>
            <p>
                plouaf! est entièrement gratuit, sans pub, sans compte à créer. L'application fonctionne aussi
                hors ligne grâce à la technologie PWA — installe-la sur ton téléphone comme une vraie appli.
                Le code source est disponible sur{" "}
                <a href="https://github.com/elo-world/plouaf" target="_blank" rel="noreferrer">
                    GitHub
                </a>
                , et réalisé par{" "}
                <a href="https://github.com/elo-world/" target="_blank" rel="noreferrer">
                    elo-world
                </a>
                .
            </p>
        </section>
    );
}

export default About;
