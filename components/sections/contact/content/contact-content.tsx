import {
  Mail,
  ArrowUpRight,
  Code,
  BriefcaseBusiness,
} from 'lucide-react';

import styles from './contact-content.module.css';

const contactMethods = [
  {
    name: 'Email',
    description: 'For opportunities and professional inquiries.',
    value: 'santiagoescobarm2005@gmail.com',
    href: 'mailto:santiagoescobarm2005@gmail.com',
    icon: Mail,
    label: 'SEND AN EMAIL',
  },
  {
    name: 'GitHub',
    description: 'Explore my repositories and development activity.',
    value: 'github.com/sescobar2005',
    href: 'https://github.com/sescobar2005',
    icon: Code,
    label: 'EXPLORE GITHUB',
  },
  {
    name: 'LinkedIn',
    description: 'Connect with me and follow my professional journey.',
    value: 'linkedin.com/in/sescobar2005',
    href: 'https://www.linkedin.com/in/sescobar2005/',
    icon: BriefcaseBusiness,
    label: 'CONNECT ON LINKEDIN',
  },
];

export default function ContactContent() {
  return (
    <div className={styles.content}>
      <div className={styles.introduction}>
        <span className={styles.sectionLabel}>
          ESTABLISH CONNECTION
        </span>

        <h3 className={styles.title}>
          Let's build something
          <span> meaningful.</span>
        </h3>

        <p className={styles.description}>
          I'm open to new opportunities, collaborations and
          conversations about software engineering.
        </p>
      </div>

      <div className={styles.contactList}>
        {contactMethods.map((method) => {
          const Icon = method.icon;

          return (
            <a
              key={method.name}
              href={method.href}
              target={method.name === 'Email' ? undefined : '_blank'}
              rel={
                method.name === 'Email'
                  ? undefined
                  : 'noopener noreferrer'
              }
              className={styles.contactCard}
            >
              <div className={styles.iconContainer}>
                <Icon size={22} strokeWidth={1.6} />
              </div>

              <div className={styles.contactInfo}>
                <span className={styles.contactName}>
                  {method.name}
                </span>

                <span className={styles.contactDescription}>
                  {method.description}
                </span>

                <span className={styles.contactValue}>
                  {method.value}
                </span>
              </div>

              <div className={styles.contactAction}>
                <span>{method.label}</span>
                <ArrowUpRight size={18} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}