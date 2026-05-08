import React from "react";
import { Link } from "react-router-dom";

function About() {
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
                Parce que le breton, doit avoir aussi ses applis web. En s'inspirant du célèbre "plouf plouf"
                des cours de récré, cette petite comptine qu'on scandait pour désigner quelqu'un au hasard, le
                nom plouaf est né, avec une touche bretonne pour faire la différence. Depuis, l'appli a grandi
                et propose aujourd'hui bien plus qu'un simple tirage au sort.
            </p>
            <h2>Ce que fait plouaf! 🎲</h2>
            <p>
                <b>Tirage au sort</b> - Importe ta liste de noms, colle-la directement ou tape-la à la main.
                plouaf! désigne un gagnant en un clic. Tu peux sauvegarder tes listes et partager tes
                résultats.
                <br />
                <b>Pile ou face</b> - Lance la pièce et découvre le résultat.
                <br />
                <b>Lancer de dé</b> - Un dé classique, toujours disponible en ligne.
                <br />
                <b>Générateur de nombres aléatoires</b> - Il suffit de choisir un interval et plouaf! générera
                un nombre.
            </p>
            <h2>8 langues, et le breton en premier 🌍</h2>
            <p>
                plouaf! est disponible en breton, corse, français, anglais, italien, espagnol, allemand et
                ukrainien. Le but est de mettre en valeur les langues régionales comme le breton ou le corse.
            </p>
            <h2>Gratuit, libre et open source</h2>
            <p>
                plouaf! est entièrement gratuit, sans pub, sans compte à créer. L'application fonctionne aussi
                hors ligne grâce à la technologie PWA, installe-la sur ton téléphone comme une vraie appli. Le
                code source est disponible sur{" "}
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
