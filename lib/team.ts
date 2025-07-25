import { StaticImageData } from 'next/image';

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string | StaticImageData;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Executive Officer & Co-Founder',
    bio: 'Emergency Medicine physician with 15 years of clinical experience. Former Director of Clinical Informatics at Johns Hopkins. MD from Harvard Medical School, MBA from Wharton. Led the development of multiple clinical decision support systems and published extensively on AI in healthcare.',
    imageUrl: 'https://avatar.vercel.sh/sarah.png?grayscale',
  },
  {
    name: 'Dr. Michael Rodriguez',
    title: 'Chief Medical Officer & Co-Founder',
    bio: "Board-certified internist and medical educator. Professor of Medicine at Stanford University with expertise in clinical reasoning and diagnostic accuracy. MD from UCSF, Master's in Medical Education from University of Illinois. Author of over 100 peer-reviewed publications on clinical decision-making.",
    imageUrl: 'https://avatar.vercel.sh/michael.png?grayscale',
  },
  {
    name: 'Dr. Priya Patel',
    title: 'Chief Technology Officer',
    bio: 'Computer scientist specializing in natural language processing and machine learning for healthcare applications. PhD in Computer Science from MIT, postdoctoral fellowship in biomedical informatics at Stanford. Previously led AI research teams at Google Health and IBM Watson Health.',
    imageUrl: 'https://avatar.vercel.sh/priya.png?grayscale',
  },
  {
    name: 'Dr. James Thompson',
    title: 'Chief Scientific Officer',
    bio: 'Physician-scientist with dual training in internal medicine and biostatistics. Expert in evidence-based medicine and clinical guidelines development. MD/PhD from University of Pennsylvania. Former consultant to WHO and CDC on clinical practice guidelines and healthcare quality metrics.',
    imageUrl: 'https://avatar.vercel.sh/james.png?grayscale',
  },
];
