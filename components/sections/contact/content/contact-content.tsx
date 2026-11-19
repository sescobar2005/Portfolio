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
    value: 'santiagoescobarm2005@gmail.com',
    href: 'mailto:santiagoescobarm2005@gmail.com',
    icon: Mail,
    label: 'SEND A MESSAGE',
  },
  {
    name: 'GitHub',
    value: 'github.com/sescobar2005',
    href: 'https://github.com/sescobar2005',
    icon: Code,
    label: 'EXPLORE REPOSITORIES',
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/sescobar2005',
    href: 'https://www.linkedin.com/in/sescobar2005/',
    icon: BriefcaseBusiness,
    label: 'LET’S CONNECT',
  },
];

export default function ContactContent() {
  return (
    <div className={styles.content}>
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
              className={styles.contactLink}
            >
              <span className={styles.iconContainer}>
                <Icon size={19} strokeWidth={1.5} />
              </span>

              <span className={styles.contactInfo}>
                <span className={styles.contactName}>
                  {method.name}
                </span>

                <span className={styles.contactValue}>
                  {method.value}
                </span>
              </span>

              <span className={styles.contactAction}>
                <span>{method.label}</span>
                <ArrowUpRight size={17} />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}