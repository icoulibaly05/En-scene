export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null; // Accepte null
    category: string;
    createdAt: string;
    updatedAt: string;
  }
  