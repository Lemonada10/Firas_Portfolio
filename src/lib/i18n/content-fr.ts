/**
 * French overrides for the CV content in `src/lib/data.ts`.
 * English there stays the source of truth; anything missing here falls back to it.
 */

type JobOverride = {
  title: string;
  location: string;
  period: string;
  bullets: string[];
};

type ProjectOverride = {
  location: string;
  tagline: string;
  description: string;
  highlights: string[];
  overview: string;
  role: string;
  keyFeatures: string[];
  challenges: string[];
  learnings: string[];
  imageAlt: string;
  galleryAlt: string[];
};

export const frPersonal = {
  headline:
    "Étudiant en génie logiciel (régime coop) qui bâtit des systèmes évolutifs en ingénierie de données, en backend et en IA appliquée.",
  location: "Montréal, QC",
};

export const frEducation: Record<string, { degree: string; end: string; details?: string }> = {
  concordia: {
    degree: "B. Ing. — Génie logiciel (régime coop)",
    end: "mai 2027",
    details: "Moyenne : 3,47",
  },
  vanier: {
    degree: "DEC — Sciences de la nature, profil sciences pures et appliquées",
    end: "2023",
  },
};

export const frCertifications: Record<string, { name: string; status: string; expected?: string }> = {
  "aws-dea": {
    name: "AWS Certified Data Engineer – Associate",
    status: "Prévue",
    expected: "févr. 2027",
  },
};

export const frExperience: Record<string, JobOverride> = {
  "pwc-2026": {
    title: "Stagiaire en analytique de données – volet ingénierie de données",
    location: "Longueuil, QC",
    period: "Mai 2026 – aujourd'hui",
    bullets: [
      "Création de pipelines Python modulaires qui centralisent les données SharePoint et d'API pour des tableaux de bord Power BI en production.",
      "Mise en place d'une architecture médaillon (atterrissage, bronze, argent, or, platine) avec transformations réutilisables, sorties Parquet et orchestrateur central.",
      "Intégration des prix Fastmarkets et Argus, avec normalisation des devises et des unités (USD/kg, USD/lb) pour des comparaisons de métaux cohérentes.",
      "Mise en place des branches et du processus de pull requests dans Azure DevOps; accompagnement des coéquipiers sur place et à l'étranger dans l'adoption de Git.",
      "Amélioration des tableaux de bord Power BI avec comparaisons de prix historiques, variations en pourcentage et périodes flexibles.",
      "Refonte en cours d'un tableau de bord d'indices économiques (IPC, IPP, coûts de main-d'œuvre) vers des sources S&P intégrées au pipeline centralisé, pour en améliorer la performance.",
    ],
  },
  fonex: {
    title: "Stagiaire en génie logiciel",
    location: "Montréal, QC",
    period: "Mai 2025 – août 2025",
    bullets: [
      "Création d'une application de bureau Python/Tkinter pour inspecter et reconfigurer des émetteurs-récepteurs au moyen des appareils Buddy.",
      "Implémentation de la communication BLE asynchrone avec bleak et asyncio pour lire et écrire la mémoire des appareils.",
      "Création d'un gestionnaire de connexions multithread qui coordonne la communication avec les appareils et l'interface de bureau.",
      "Tests des versions alpha et bêta de l'application mobile dans QMetry, couvrant la connectivité des appareils et la configuration des émetteurs-récepteurs.",
    ],
  },
  "pwc-2025": {
    title: "Stagiaire en analytique de données",
    location: "Longueuil, QC",
    period: "Janv. 2025 – avr. 2025",
    bullets: [
      "Regroupement de plus de 20 sources Databricks en jeux de données organisés pour les rapports Power BI sur les ventes de pièces.",
      "Refonte de l'ingestion, du nettoyage et des transformations PySpark en fonctions réutilisables pour les pipelines existants.",
      "Rédaction de tests automatisés pour les fonctions de transformation dans le cadre de tests existant.",
      "Refonte des tableaux de bord pour faire ressortir les tendances de ventes quotidiennes, hebdomadaires et mensuelles par rapport aux objectifs.",
    ],
  },
};

export const frJobLabel: Record<string, string> = {
  "pwc-2026": "P&WC — Analytique (ingénierie de données)",
  fonex: "Fonex",
  "pwc-2025": "P&WC — Analytique de données",
};

export const frHeroRotatingRoles = [
  "Stagiaire en analytique (ingénierie de données) @ Pratt & Whitney Canada",
  "Pipelines médaillon en Python",
  "Backend et systèmes BLE",
  "ML appliqué dans le navigateur",
];

export const frProjects: Record<string, ProjectOverride> = {
  "concordia-campus-guide": {
    location: "Montréal, QC",
    tagline:
      "Un guide de campus Android/iOS complet avec navigation intérieure et extérieure, suivi des navettes et itinéraires vers les cours tirés de Google Agenda.",
    description:
      "Application React Native développée en équipe (MAKESOFT) qui aide les étudiants de Concordia à se déplacer sur les campus SGW et Loyola — à l'intérieur comme à l'extérieur — avec horaires de navettes en temps réel et itinéraires vers les cours.",
    highlights: [
      "Itinéraires intérieurs et extérieurs",
      "Intégration des navettes de Concordia",
      "Itinéraires vers les cours via Google Agenda",
    ],
    overview:
      "MAKESOFT est un projet d'équipe de 9 personnes mené en Agile sur quatre sprints. L'application couvre tout le problème de navigation des étudiants de Concordia : trouver les pavillons, obtenir des itinéraires extérieurs à pied, en voiture ou en transport en commun, suivre le service de navettes intercampus avec les départs en direct, naviguer à l'intérieur d'une salle à l'autre sur plusieurs étages, et générer automatiquement l'itinéraire vers le prochain cours à partir de Google Agenda. Les deux campus (SGW et Loyola) sont entièrement pris en charge avec des superpositions de pavillons personnalisées sur Google Maps.",
    role:
      "Contributeur frontend — création des interfaces reliant les cartes du campus, les itinéraires et la navigation vers les cours selon l'agenda, et contribution aux tests automatisés dans un flux CI/CD intégrant les contrôles de qualité SonarQube.",
    keyFeatures: [
      "Cartes interactives des campus SGW et Loyola avec formes de pavillons personnalisées et fenêtres d'information.",
      "Itinéraires extérieurs (marche, voiture, transport en commun) entre deux pavillons du campus.",
      "Intégration de la navette de Concordia : prochains départs, compte à rebours en direct et itinéraires par navette.",
      "Synchronisation Google Agenda — génère automatiquement l'itinéraire vers le prochain cours de l'utilisateur.",
      "Navigation intérieure de salle à salle avec plans d'étage, itinéraires accessibles et points d'intérêt (toilettes, ascenseurs).",
      "Bascule de campus pour passer instantanément des vues SGW à Loyola.",
    ],
    challenges: [
      "Assembler les graphes de plans d'étage intérieurs et le routage extérieur de Google Maps en un trajet continu.",
      "Rendre le routage par navette sensible à l'heure pour ne proposer que des départs réellement atteignables.",
      "Analyser et normaliser les événements Google Agenda pour en extraire de façon fiable les codes de pavillon et de salle.",
      "Coordonner une équipe de 9 personnes sur quatre sprints Agile de deux semaines, avec CI/CD et contrôles SonarQube.",
    ],
    learnings: [
      "Comment modéliser la navigation intérieure sous forme de graphe pondéré et l'intégrer à un SDK de cartographie externe.",
      "L'Agile à l'échelle en pratique : planification de sprint, graphiques d'avancement, rétrospectives et revues de code.",
      "Les compromis entre la récupération de données côté client et côté serveur pour l'information de transport en temps réel.",
      "La conception axée sur l'accessibilité pour les personnes à mobilité réduite dans un contexte de navigation.",
    ],
    imageAlt: "MAKESOFT — bannière de l'application de navigation du campus de Concordia",
    galleryAlt: [
      "Carte du campus SGW avec repères des pavillons",
      "Carte du campus Loyola avec repères des pavillons",
      "Itinéraire de navette de SGW vers Loyola",
      "Prochaines heures de départ des navettes",
      "Itinéraire extérieur étape par étape",
      "Navigation intérieure par étage",
      "Navigation intérieure étape par étape avec routage vers les salles",
      "Écran d'accueil de l'application",
      "Écran d'intégration à Google Agenda",
    ],
  },
  "mindfulness-focus-tracker-ai": {
    location: "Montréal, QC",
    tagline:
      "Moniteur d'attention en temps réel dans le navigateur, basé sur un maillage facial IA — détecte la distraction et envoie de légers signaux audio et visuels pour aider à se reconcentrer.",
    description:
      "Un coach de concentration alimenté par la webcam qui suit le regard, la pose de la tête et les indices faciaux en temps réel, enregistre les mesures de session et ramène doucement l'utilisateur à sa tâche — sans matériel spécialisé.",
    highlights: [
      "Suivi de l'attention par maillage facial en direct",
      "Amélioration moyenne de 6,3 % de la concentration avec alertes",
      "Sondage post-session et export Excel",
    ],
    overview:
      "Le Mindfulness & Focus Tracker AI est un système de suivi de l'attention entièrement dans le navigateur, conçu par une équipe de 4 personnes. L'utilisateur se connecte avec un pseudonyme, configure une séance d'étude (matière, objectif, durée prévue, ambiance sonore, bips d'alerte), puis démarre une session où le flux webcam est traité localement avec TensorFlow.js — aucune vidéo ne quitte l'appareil. Le système superpose un maillage facial 3D sur le flux, analyse la direction du regard, l'ouverture des yeux et la pose de la tête pour estimer l'attention en temps réel, et déclenche un bip discret lorsqu'une distraction dépasse un délai de récupération. Après la session, l'utilisateur remplit un court sondage sur son niveau de concentration, la source de distraction et ses préférences d'interface. Les données de session et de sondage sont stockées localement et exportables vers Excel. Une étude auprès de 10 participants a montré une amélioration moyenne de 6,3 % du pourcentage de concentration lorsque les bips d'alerte étaient activés.",
    role:
      "Codéveloppeur — création des interfaces React pour la configuration de session, le suivi en direct et la rétroaction post-session, et contribution à l'historique des sessions et aux exports Excel pour consulter les mesures de concentration et les résultats du sondage.",
    keyFeatures: [
      "Estimation de l'attention en temps réel par maillage facial avec TensorFlow.js et MediaPipe — direction du regard, ouverture des yeux et rotation de la tête.",
      "Bip d'alerte discret déclenché après un délai configurable lorsqu'une distraction est détectée, ce qui limite les interruptions inutiles.",
      "Assistant de configuration : matière, objectif, durée prévue (minutes ou h:mm), bruit de pluie ou bruit blanc en fond, et activation des alertes.",
      "Panneau de mesures en direct : concentration instantanée, concentration de la session, nombre de distractions, minuteur, détection du visage et images par seconde.",
      "Page d'historique listant toutes les sessions passées avec concentration, nombre de distractions, durée prévue et réelle, et objectif.",
      "Sondage post-session avec curseurs et menus : niveau de concentration, niveau et source de distraction, effet du maillage, facilité d'utilisation, préférence d'affichage.",
      "Page de résultats de sondage avec détail par session et export Excel en un clic.",
      "Traitement entièrement local — aucune vidéo stockée ni transmise, ce qui préserve la vie privée.",
    ],
    challenges: [
      "Supprimer le bruit et les faux positifs de distraction issus de la webcam sans ajouter de latence perceptible.",
      "Concevoir un délai de récupération pour les alertes qui évite la fatigue de notification tout en captant les vraies baisses d'attention.",
      "Maintenir l'inférence TensorFlow.js performante sur du matériel grand public — garder un bon nombre d'images par seconde sur une session de 60 minutes.",
      "Équilibrer le maillage facial comme repère utile sans qu'il devienne lui-même une source de distraction (70 % des utilisateurs l'ont finalement voulu optionnel).",
      "Recueillir des données de sondage utiles après les sessions sans que le questionnaire paraisse lourd.",
    ],
    learnings: [
      "Comment bâtir une boucle d'inférence ML stable en temps réel dans le navigateur avec TensorFlow.js et les points de repère faciaux de MediaPipe.",
      "L'effet Hawthorne et comment atténuer le biais d'observation dans les études utilisateurs en IHM.",
      "Concevoir une rétroaction utile sans être intrusive — la différence entre un rappel doux et une alerte perturbante.",
      "Que le nombre de distractions et le pourcentage de concentration sont des mesures indépendantes : plus de distractions avec les alertes peut quand même donner plus de temps concentré, parce que la récupération est plus rapide.",
      "La recherche UX itérative : les données du sondage ont directement mené à rendre le maillage optionnel dans la version suivante.",
    ],
    imageAlt:
      "Mindfulness & Focus Tracker AI — session en direct avec superposition du maillage facial",
    galleryAlt: [
      "Écran de connexion — bienvenue dans Focus Tracker AI, connexion par prénom",
      "Tableau de bord — démarrer une session, voir le profil et l'historique, résultats du sondage",
      "Configuration de session — objectif d'étude, durée prévue, ambiance sonore et préférences d'alerte",
      "Session active — flux webcam en direct avec maillage facial et mesures de concentration en temps réel",
      "Historique des sessions — sessions passées avec concentration, distractions et durée prévue",
      "Sondage post-session — curseurs de concentration, source de distraction, effet du maillage et facilité d'utilisation",
      "Page de résultats du sondage avec bouton d'export vers Excel",
    ],
  },
  "peer-review-web-app": {
    location: "Montréal, QC",
    tagline:
      "Plateforme full-stack d'évaluation par les pairs en milieu académique, avec authentification à deux rôles, gestion d'équipes et notation structurée sur plusieurs critères.",
    description:
      "Une application web où les enseignants créent des équipes et où les étudiants soumettent des évaluations structurées — en notant leurs coéquipiers sur la coopération, la contribution conceptuelle, la contribution pratique et l'éthique de travail.",
    highlights: [
      "Tableaux de bord distincts pour enseignants et étudiants",
      "Création d'équipes et affectation des étudiants",
      "Évaluation par les pairs sur plusieurs critères (échelle de 1 à 5)",
    ],
    overview:
      "Conçue en équipe (MakeSoft), cette application web simplifie l'évaluation par les pairs en milieu académique. Les enseignants s'inscrivent et reçoivent un code de section, puis créent des équipes nommées et y affectent les étudiants inscrits. Les étudiants voient leur équipe, consultent la liste de leurs coéquipiers et soumettent une évaluation individuelle pour chaque personne selon quatre dimensions notées de 1 à 5, avec commentaires facultatifs. La séparation des rôles est appliquée partout : les enseignants n'évaluent jamais et les étudiants ne peuvent pas gérer les équipes.",
    role:
      "Contributeur full-stack — conception du frontend React avec routage selon le rôle, implémentation des API REST Spring Boot pour la gestion des utilisateurs, le CRUD des équipes et la soumission des évaluations, modélisation du schéma PostgreSQL et configuration de l'intégration Firebase Auth pour la connexion sociale et par courriel.",
    keyFeatures: [
      "Contrôle d'accès selon le rôle : tableaux de bord distincts pour enseignants et étudiants, avec routes protégées.",
      "Gestion d'équipes côté enseignant : créer des équipes nommées, voir les étudiants non affectés, ajouter ou retirer des membres.",
      "Accueil étudiant : affiche le nom de l'équipe, liste les coéquipiers et propose un bouton d'évaluation pour chaque pair (jamais pour soi-même).",
      "Formulaire d'évaluation par les pairs : quatre critères notés (coopération, contribution conceptuelle, contribution pratique, éthique de travail) de 1 à 5, avec commentaires facultatifs.",
      "Page de confirmation : présente un résumé par critère immédiatement après la soumission.",
      "Firebase Auth avec courriel/mot de passe et OAuth social (GitHub, Google), plus une inscription enseignant avec code de section.",
      "Arrière-plan animé à particules et interface sombre en Tailwind CSS, pour un rendu soigné et cohérent.",
    ],
    challenges: [
      "Garder des vues propres selon le rôle sans dupliquer la logique de mise en page entre les composants enseignant et étudiant.",
      "Empêcher les étudiants de s'auto-évaluer tout en générant dynamiquement la liste des coéquipiers.",
      "Concevoir un système de code de section pour que enseignants et étudiants soient toujours rattachés à la bonne cohorte.",
      "Structurer le schéma d'évaluation pour permettre l'ajout futur de critères sans casser les soumissions existantes.",
    ],
    learnings: [
      "Comment modéliser proprement des relations bidirectionnelles (étudiant ↔ équipe ↔ évaluation) dans un schéma relationnel.",
      "Le contrôle d'accès basé sur les rôles en pratique, côté API et côté interface, sans surcharger l'intergiciel.",
      "La valeur UX d'une confirmation immédiate et détaillée par critère après la soumission d'un formulaire.",
      "La coordination d'une équipe de plusieurs personnes avec des pratiques Agile par sprints et des revues de code.",
    ],
    imageAlt:
      "Application web d'évaluation par les pairs — tableau de bord enseignant avec gestion des équipes",
    galleryAlt: [
      "Page d'accueil — évaluation par les pairs par MakeSoft",
      "Formulaire d'inscription étudiant avec nom complet, matricule, section, courriel et mot de passe",
      "Formulaire d'inscription enseignant avec nom complet, section, courriel et mot de passe",
      "Écran de connexion étudiant avec courriel/mot de passe et options OAuth",
      "Tableau de bord enseignant avec création d'équipe, étudiants non affectés et liste des équipes",
      "Enseignant affectant un étudiant à une équipe par menu déroulant",
      "Vue enseignant après affectation — membres de l'équipe avec boutons de retrait",
      "Tableau de bord étudiant avec nom de l'équipe, coéquipiers et boutons d'évaluation",
      "Formulaire d'évaluation avec 4 critères et menu de notation de 1 à 5 ouvert",
      "Formulaire d'évaluation rempli avant la soumission",
      "Confirmation de soumission avec les notes enregistrées",
    ],
  },
};
