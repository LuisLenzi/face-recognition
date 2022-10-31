import Head from "next/head";
import Image from "next/image";

import { FiGithub, FiMonitor, FiLinkedin, FiInstagram } from "react-icons/fi";

import { HiExternalLink } from "react-icons/hi";

import { Tooltips } from "../../components/Tooltip";

import styles from "./Autors.module.scss";

const TITLE = "Autores";
const SUBTITLE = "Autores do Projeto ";

export default function Autors() {
  const autors = [
    {
      id: 1,
      name: "Luís Lenzi",
      image: "/assets/luis.png",
      email: "luis.lenzi@alunos.unis.edu.br",
      socialMedias: [
        {
          id: 1,
          name: "Github",
          link: "https://www.github.com/luislenzi",
          icon: <FiGithub size={20} />,
        },
        {
          id: 2,
          name: "Portifólio",
          link: "https://luislenzi.dev",
          icon: <FiMonitor size={20} />,
        },
        {
          id: 3,
          name: "Instagram",
          link: "https://instagram.com/luislenzi",
          icon: <FiInstagram size={20} />,
        },
        {
          id: 4,
          name: "Linkedin",
          link: "https://www.linkedin.com/in/lu%C3%ADs-gustavo-costa-lenzi-8915921b4/",
          icon: <FiLinkedin size={20} />,
        },
      ],
    },
    {
      id: 2,
      name: "Guilherme Cruz",
      image: "/assets/guilherme.png",
      email: "guilherme.cruz1@alunos.unis.edu.br",
      socialMedias: [
        {
          id: 1,
          name: "Linkedin",
          link: "https://www.linkedin.com/in/guilherme-cruz-55a88718b/",
          icon: <FiLinkedin size={20} />,
        },
        {
          id: 2,
          name: "Instagram",
          link: "https://instagram.com/guipereira07",
          icon: <FiInstagram size={20} />,
        },
      ],
    },
    {
      id: 3,
      name: "Hugo Massote",
      image: "/assets/hugo.png",
      email: "hugo.massote@alunos.unis.edu.br",
      socialMedias: [
        {
          id: 1,
          name: "Portifólio",
          link: "https://hmcelulares.com",
          icon: <FiMonitor size={20} />,
        },
        {
          id: 2,
          name: "Instagram",
          link: "https://instagram.com/hugomassote",
          icon: <FiInstagram size={20} />,
        },
      ],
    },
    {
      id: 4,
      name: "Victor Bento",
      image: "/assets/victor.png",
      email: "victor.bento@alunos.unis.edu.br",
      socialMedias: [
        {
          id: 1,
          name: "Portifólio",
          link: "https://victordob.com",
          icon: <FiMonitor size={20} />,
        },
        {
          id: 2,
          name: "Instagram",
          link: "https://instagram.com/victordob",
          icon: <FiInstagram size={20} />,
        },
        {
          id: 3,
          name: "Linkedin",
          link: "https://www.linkedin.com/in/victordob/",
          icon: <FiLinkedin size={20} />,
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={SUBTITLE} />
      </Head>

      <div className={styles.titles}>
        <p className={styles.subtitle}>{SUBTITLE}</p>
        <h1 className={styles.title}>{TITLE}</h1>
      </div>

      <div className={styles.content}>
        {autors.map((autor) => (
          <div className={styles.autor} key={autor.id}>
            <Image
              width={250}
              height={375}
              quality={100}
              alt={autor.name}
              src={autor.image}
              className={styles.image}
            />
            <div className={styles.autorInfo}>
              <h2>{autor.name}</h2>
              <p>{autor.email}</p>
              <div className={styles.socialMedias}>
                {autor.socialMedias.map((socialMedia) => (
                  <Tooltips
                    placement="bottom"
                    key={socialMedia.id}
                    title={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: ".25rem",
                        }}
                      >
                        {socialMedia.name} <HiExternalLink size={15} />
                      </div>
                    }
                  >
                    <a
                      target="_blank"
                      href={socialMedia.link}
                      rel="noopener noreferrer"
                    >
                      {socialMedia.icon}
                    </a>
                  </Tooltips>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
